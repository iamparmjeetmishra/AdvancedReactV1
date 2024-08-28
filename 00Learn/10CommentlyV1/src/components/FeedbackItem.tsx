import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type TFeedbackItem } from "../lib/types";


type FeedbackItemProps = {
   feedbackItemData: TFeedbackItem
}

export default function FeedbackItem({feedbackItemData}:FeedbackItemProps) {
	return (
		<li className="feedback">
			<button>
				<TriangleUpIcon />
            <span>{ feedbackItemData.upvoteCount}</span>
			</button>
			<div>
            <p>{ feedbackItemData.badgeLetter}</p>
			</div>
			<div>
            <p>{feedbackItemData.company }</p>
				<p>
               { feedbackItemData.text }
				</p>
			</div>
			<p>{feedbackItemData.daysAgo === 0 ? 'New' : `${feedbackItemData.daysAgo}d`}</p>
		</li>
	);
}
