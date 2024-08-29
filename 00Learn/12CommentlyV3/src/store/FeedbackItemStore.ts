import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type TStore = {
   feedbackItems: TFeedbackItem[];
   loading: boolean;
   errMessage: string;
   selectedCompany: string;
   getCompanyList: () => string[];
   getFilteredFeedbackItems: () => TFeedbackItem[];
   handleAddToList: (text: string) => Promise<void>;
   selectCompany: (company: string) => void;
   fetchFeedbackItems: () => Promise<void>
}


export const useFeedbackItemsStore = create<TStore>((set, get) => ({
	feedbackItems: [],
	loading: false,
	errMessage: "",
	selectedCompany: "",
	fetchFeedbackItems: async () => {
		set(() => ({
			loading: true,
		}));

		try {
			const res = await fetch(
				"https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
			);
			if (!res.ok) {
				throw new Error("Fetch failed");
			}
			const data = await res.json();
			// setFeedbackItems(data.feedbacks);
			set(() => ({
				feedbackItems: data.feedbacks,
			}));
		} catch (error) {
			console.log("Err Fetching:", error);
			set(() => ({
				errMessage:
					error instanceof Error
						? error.message
						: "An unexpected error while fetching",
			}));

			set(() => ({
				loading: false,
			}));
		} finally {
			// setLoading(false);
			set(() => ({
				loading: false,
			}));
		}
	},
	handleAddToList: async (text: string) => {
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
		// setFeedbackItems([...feedbackItems, newItem]);
		set((state) => ({
			feedbackItems: [...state.feedbackItems, newItem],
		}));

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
	},
	selectCompany: (company: string) => {
		set(() => ({
			selectedCompany: company,
		}));
	},
	getCompanyList: () => {
		return get()
			.feedbackItems.map((item) => item.company)
			.filter((company, index, array) => {
				return array.indexOf(company) === index;
			});
	},
   getFilteredFeedbackItems: () => {
      const state = get()
		return state.selectedCompany
			? state.feedbackItems.filter(
					(feedbackItem) => feedbackItem.company === state.selectedCompany
			)
			: state.feedbackItems;
	},
}));
