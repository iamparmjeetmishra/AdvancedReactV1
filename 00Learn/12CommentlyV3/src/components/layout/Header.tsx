import { useFeedbackItemsStore } from "../../store/FeedbackItemStore";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";


export default function Header() {

	// const { handleAddToList } = useFeedbackItemsContext()
	const handleAddToList = useFeedbackItemsStore(state => state.handleAddToList)

	return <header>
		<Pattern />
		<Logo />
		<PageHeading />
		<FeedbackForm handleAddToList={handleAddToList} />
	</header>;
}