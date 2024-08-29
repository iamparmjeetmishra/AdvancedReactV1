import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import { useFeedbackItemsContext } from "../../lib/hooks";


export default function FeedbackList() {

	const { loading, errMessage, filteredFeedbackItems } = useFeedbackItemsContext()

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