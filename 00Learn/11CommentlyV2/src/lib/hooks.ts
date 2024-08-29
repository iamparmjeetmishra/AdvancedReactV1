import { useContext, useEffect, useState } from "react";
import { FeedbackItemContext } from "../context/FeedbackItemContextProvider";
import { TFeedbackItem } from "./types";


export function useFeedbackItemsContext() {
   const context = useContext(FeedbackItemContext)
   if (!context) {
      throw new Error(
         'Feedback context error'
      )
   }
   return context
}

export function useFeedbackItems () {
   const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [errMessage, setErrMessage] = useState("");
   
// data fetched and set
useEffect(() => {
   setLoading(true);
   const fetchData = async () => {
      try {
         const res = await fetch(
            "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
         );
         if (!res.ok) {
            throw new Error("Fetch failed");
         }
         const data = await res.json();
         setFeedbackItems(data.feedbacks);
      } catch (error) {
         console.log("Err Fetching:", error);
         setErrMessage(
            error instanceof Error
               ? error.message
               : "An unexpected error while fetching"
         );
         setLoading(false);
      } finally {
         setLoading(false);
      }
   };
   fetchData();
}, []);
   return {
      feedbackItems,
      setFeedbackItems,
      loading,
      setLoading,
      errMessage,
      setErrMessage
   }
}