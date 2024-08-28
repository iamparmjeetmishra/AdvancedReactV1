import { TFeedbackItem } from "../../lib/types";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

type TContainerProp = {
  handleAddToList: (text: string) => void;
  loading: boolean;
  errMessage: string;
  feedbackItems: TFeedbackItem[];
}

export default function Container({handleAddToList, loading, errMessage, feedbackItems}:TContainerProp) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList loading={loading} errMessage={errMessage} feedbackItems={feedbackItems} />
    </main>
  )
}
