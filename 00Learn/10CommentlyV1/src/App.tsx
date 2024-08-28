import { useEffect, useState } from "react";
import Container from "./components/Container";
import Footer from "./components/Footer";
import HashtagList from "./components/HashtagList";
import { TFeedbackItem } from "./lib/types";

export default function App() {

  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [errMessage, setErrMessage] = useState("");

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
			badgeLetter: companyName.substring(0,1).toUpperCase(),
		};
    setFeedbackItems([...feedbackItems, newItem]);
    
    await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks", {
      method: 'Post',
      body: JSON.stringify(newItem),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
	};

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

  return (
    <div className="app">
      <Footer />
      <Container
        handleAddToList={handleAddToList}
        loading={loading}
        errMessage={errMessage}
        feedbackItems={feedbackItems} />
      <HashtagList />
    </div>
  )
}
