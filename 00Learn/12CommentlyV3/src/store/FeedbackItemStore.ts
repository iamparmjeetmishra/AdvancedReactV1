import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";



create((set) => ({
   feedbackItems: [],
   loading: false,
   errMessage: '',
   selectedCompany: '',
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
      set(state => ({
         FeedbackItems: [...state.feedbackItems, newItem]
      }))

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
         selectedCompany: company
      }))
   },
   fetchFeedbackItems: async () => {
      // setLoading(true)

      set(() => ({
         loading: true
      }))

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
            setFeedbackItems: data.feedbacks
         }))
      } catch (error) {
         console.log("Err Fetching:", error);
         set(() => ({
            setErrMessage: error instanceof Error ? error.message : "An unexpected error while fetching"
         }))
         // setErrMessage(
         //    error instanceof Error
         //       ? error.message
         //       : "An unexpected error while fetching"
         // );
         // setLoading(false);
         set(() => ({
            loading: false
         }))
      } finally {
         // setLoading(false);
         set(() => ({
            loading: false
         }))
      }
   },
}))