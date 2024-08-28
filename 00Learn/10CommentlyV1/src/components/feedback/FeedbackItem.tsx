import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type TFeedbackItem } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = {
	feedbackItemData: TFeedbackItem;
};

export default function FeedbackItem({
	feedbackItemData,
}: FeedbackItemProps) {
	const [open, setOpen] = useState(false);
	const [upvoteCount, setUpvoteCount] = useState(feedbackItemData.upvoteCount)

	const handleUpvoteCount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		e.currentTarget.disabled = true
		setUpvoteCount(prev => ++prev)
	}

	return (
		<li onClick={() => setOpen(prev => !prev )} className={`feedback ${open ? "feedback--expand" : ""}`}>
			<button onClick={handleUpvoteCount}>
				<TriangleUpIcon />
				<span>{upvoteCount}</span>
			</button>
			<div>
				<p>{feedbackItemData.badgeLetter}</p>
			</div>
			<div>
				<p>{feedbackItemData.company}</p>
				<p>{feedbackItemData.text}</p>
			</div>
			<p>
				{feedbackItemData.daysAgo === 0
					? "New"
					: `${feedbackItemData.daysAgo}d`}
			</p>
		</li>
	);
}
