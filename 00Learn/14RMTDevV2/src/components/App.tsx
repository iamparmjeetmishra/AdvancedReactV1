import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import Pagination from "./PaginationControls";
import JobList from "./JobList";
import Sorting from "./SortingControls";
import ResultsCount from "./ResultsCount";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { TPageDirection, TSortBy } from "../lib/type";

function App() {
	//state
	const [searchText, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const debouncedSearchText = useDebounce(searchText);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const [sortBy, setSortBy] = useState<TSortBy>("relevant");

	// derived
	const jobItemsNumber = jobItems?.length || 0;
	const totalNumOfPage = jobItemsNumber / RESULTS_PER_PAGE;
	const jobItemsSorted =
		[...(jobItems || [])].sort((a, b) => {
			if (sortBy === "relevant") {
				return b.relevanceScore - a.relevanceScore;
			} else {
				return a.daysAgo - b.daysAgo;
			}
		}) || [];
	const jobItemsSortedAndSliced =
		jobItemsSorted?.slice(
			currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
			currentPage * RESULTS_PER_PAGE
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
		setCurrentPage(1)
		setSortBy(newSortBy);
	};

	return (
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>
				<SearchForm
					searchText={searchText}
					setSearchText={setSearchText}
				/>
			</Header>

			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount
							count={jobItemsNumber > 0 ? jobItemsNumber : 0}
						/>
						<Sorting sortBy={sortBy} onClick={handleChangeSortBy} />
					</SidebarTop>
					<JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
					<Pagination
						onClick={handleChangePage}
						currentPage={currentPage}
						totalNumOfPage={totalNumOfPage}
					/>
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />
			<Toaster position="top-right" />
		</>
	);
}

export default App;
