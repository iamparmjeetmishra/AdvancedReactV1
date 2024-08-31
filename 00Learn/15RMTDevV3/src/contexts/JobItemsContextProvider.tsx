import { createContext, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { TJobItem, TPageDirection, TSortBy } from "../lib/type";
import { RESULTS_PER_PAGE } from "../lib/constants";

type TJobItemsContext = {
	jobItems: TJobItem[] | undefined;
	jobItemsSortedAndSliced: TJobItem[];
	isLoading: boolean;
	totalNumberOfPages: number;
	totalNumberOfResults: number;
	currentPage: number;
	sortBy: TSortBy;
	handleChangePage: (direction: TPageDirection) => void;
	handleChangeSortBy: (newSortBy: TSortBy) => void;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(
	null
);

export default function JobItemsContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { debouncedSearchText } = useSearchTextContext();
	const [currentPage, setCurrentPage] = useState(1);
	const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
	const [sortBy, setSortBy] = useState<TSortBy>("relevant");

	// derived
	const totalNumberOfResults = jobItems?.length || 0;
	const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
	const jobItemsSorted = useMemo(
		() =>
			[...(jobItems || [])].sort((a, b) => {
				if (sortBy === "relevant") {
					return b.relevanceScore - a.relevanceScore;
				} else {
					return a.daysAgo - b.daysAgo;
				}
			}) || [],
		[jobItems, sortBy]
	);
	const jobItemsSortedAndSliced = useMemo(
		() =>
			jobItemsSorted?.slice(
				currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
				currentPage * RESULTS_PER_PAGE
			),
		[currentPage, jobItemsSorted]
	);

	// event

	const handleChangePage = (direction: TPageDirection) => {
		if (direction === "next") {
			setCurrentPage((prev) => prev + 1);
		} else if (direction === "previous") {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const handleChangeSortBy = (newSortBy: TSortBy) => {
		setCurrentPage(1);
		setSortBy(newSortBy);
	};
	return (
		<JobItemsContext.Provider
			value={{
				jobItems,
				jobItemsSortedAndSliced,
				isLoading,
				totalNumberOfPages,
				totalNumberOfResults,
				currentPage,
				sortBy,
				handleChangePage,
				handleChangeSortBy,
			}}
		>
			{children}
		</JobItemsContext.Provider>
	);
}
