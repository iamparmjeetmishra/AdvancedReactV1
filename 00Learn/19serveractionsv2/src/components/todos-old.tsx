"use client";

import { useRef, useState } from "react";

export default function TodosOld() {
	const ref = useRef<HTMLFormElement>(null);
	const [inputText, setInputText] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const formAction = async () => {
		setIsSubmitting(true);
		await fetch("api/todos", {
			method: "POST",
			body: JSON.stringify({
				content: inputText,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		setIsSubmitting(false);
	};

	return (
		<>
			<form
				ref={ref}
				className="flex flex-col gap-4 w-[300px] my-16"
				onSubmit={formAction}
			>
				<h2>Old way</h2>

				<input
					type="text"
					name="content"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					className="p-2"
					placeholder="Write your todo..."
					required
				/>
				<button className="bg-cyan-500 text-white font-semibold py-2 px-6">
					{isSubmitting ? "Adding..." : "Add Todo"}
				</button>
			</form>
		</>
	);
}
