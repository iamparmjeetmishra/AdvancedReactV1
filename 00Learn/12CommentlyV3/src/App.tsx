import HashtagList from "./components/HashtagList";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import { useFeedbackItemsStore } from "./store/FeedbackItemStore";
import { useEffect } from "react";


export default function App() {
	const fetchData = useFeedbackItemsStore(state => state.fetchFeedbackItems)
	// fetchData()
	useEffect(() => {
		fetchData()
	}, [fetchData])
	return (
		<div className="app">
			<Footer />
				<Container />
				<HashtagList />
		</div>
	);
}