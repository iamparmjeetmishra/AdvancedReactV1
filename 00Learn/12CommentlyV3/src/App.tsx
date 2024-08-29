import HashtagList from "./components/HashtagList";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import FeedbackItemContextProvider from "./context/FeedbackItemContextProvider";

export default function App() {
	return (
		<div className="app">
			<Footer />
			<FeedbackItemContextProvider>
				<Container />
				<HashtagList />
			</FeedbackItemContextProvider>
		</div>
	);
}
