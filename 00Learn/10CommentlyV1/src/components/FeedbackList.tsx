import { TriangleUpIcon } from "@radix-ui/react-icons"

export default function FeedbackList() {
	return (
		<ol className="feedback-list">
			<li className="feedback">
				<button>
					<TriangleUpIcon />
					<span>458</span>
				</button>
				<div>
					<p>B</p>
				</div>
				<div>
					<p>Parm</p>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit.
						Sunt, cupiditate!
					</p>
				</div>
				<p>4d</p>
			</li>
		</ol>
	);
}
