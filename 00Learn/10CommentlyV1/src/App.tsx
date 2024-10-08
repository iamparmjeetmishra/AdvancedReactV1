import { useEffect, useMemo, useState } from "react";
import HashtagList from "./components/HashtagList";
import { TFeedbackItem } from "./lib/types";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

export default function App() {
	const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [selectedCompany, setSelectedCompany] = useState("");

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

	const companyList = useMemo(() => feedbackItems
		.map((item) => item.company)
		.filter((company, index, array) => {
			return array.indexOf(company) === index;
		}), [feedbackItems])

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

	console.log(companyList);

	return (
		<div className="app">
			<Footer />
			<Container
				handleAddToList={handleAddToList}
				loading={loading}
				errMessage={errMessage}
				feedbackItems={filteredFeedbackItems}
			/>
			<HashtagList
				companyList={companyList}
				handleSelectCompany={handleSelectCompany}
			/>
		</div>
	);
}
