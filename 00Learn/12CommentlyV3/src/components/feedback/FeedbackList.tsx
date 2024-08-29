import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import { useFeedbackItemsStore } from "../../store/FeedbackItemStore";


export default function FeedbackList() {

	const loading = useFeedbackItemsStore((state) => state.loading)
	const errMessage = useFeedbackItemsStore((state) => state.errMessage)
	const filteredFeedbackItems = useFeedbackItemsStore((state) => state.getFilteredFeedbackItems())

	console.log(filteredFeedbackItems)

	return (
		<ol className="feedback-list">
			{loading && <Spinner />}
			{errMessage && <ErrorMessage message={errMessage} />}
			{filteredFeedbackItems.map((item) => (
				<FeedbackItem key={item.id} feedbackItemData={item} />
			))}
		</ol>
	);
}


type ErrorMsgProps = {
	message: string;
};

function ErrorMessage({ message }: ErrorMsgProps) {
	return <p className="errMsg">Error while Fetching: {message}</p>;
}