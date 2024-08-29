import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type TFeedbackItemContextProviderProps = {
	children: React.ReactNode;
};

type TFeedbackItemsContext = {
	feedbackItems: TFeedbackItem[];
	loading: boolean;
	errMessage: string;
	companyList: string[];
	handleAddToList: (text: string) => void;
	handleSelectCompany: (company: string) => void;
	filteredFeedbackItems: TFeedbackItem[];
};

export const FeedbackItemContext =
	createContext<TFeedbackItemsContext | null>(null);

export default function FeedbackItemContextProvider({
	children,
}: TFeedbackItemContextProviderProps) {
	const { feedbackItems, setFeedbackItems, loading, errMessage } =
		useFeedbackItems();
	const [selectedCompany, setSelectedCompany] = useState("");

	// Data Added
	const handleAddToList = async (text: string) => {
		const companyName = text
			.split(" ")
			.find((word) => word.includes("#"))!
			.substring(1);

		const newItem: TFeedbackItem = {
			id: new Date().getTime(),
			text: text,
			upvoteCount: 0,
			daysAgo: 0,
			company: companyName,
			badgeLetter: companyName.substring(0, 1).toUpperCase(),
		};
		setFeedbackItems([...feedbackItems, newItem]);

		await fetch(
			"https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
			{
				method: "Post",
				body: JSON.stringify(newItem),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);
	};

	// Tag- Company Filtered list for single tag
	const companyList = useMemo(
		() =>
			feedbackItems
				.map((item) => item.company)
				.filter((company, index, array) => {
					return array.indexOf(company) === index;
				}),
		[feedbackItems]
	);

	const filteredFeedbackItems = useMemo(
		() =>
			selectedCompany
				? feedbackItems.filter(
						(feedbackItem) => feedbackItem.company === selectedCompany
				  )
				: feedbackItems,
		[feedbackItems, selectedCompany]
	);

	const handleSelectCompany = (company: string) => {
		setSelectedCompany(company);
	};

	return (
		<FeedbackItemContext.Provider
			value={{
				feedbackItems,
				loading,
				errMessage,
				companyList,
				handleAddToList,
				handleSelectCompany,
				filteredFeedbackItems,
			}}
		>
			{children}
		</FeedbackItemContext.Provider>
	);
}
