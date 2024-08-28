import { TFeedbackItem } from "../../lib/types";
import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";

type TFeedbackListProp = {
	loading: boolean;
	errMessage: string;
	feedbackItems: TFeedbackItem[];
};

export default function FeedbackList({
	loading,
	errMessage,
	feedbackItems,
}: TFeedbackListProp) {
	return (
		<ol className="feedback-list">
			{loading && <Spinner />}
			{errMessage && <ErrorMessage message={errMessage} />}
			{feedbackItems.map((item) => (
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
