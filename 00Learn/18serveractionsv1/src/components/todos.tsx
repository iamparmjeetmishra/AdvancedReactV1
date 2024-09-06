"use client";

import { addTodo } from "@/actions/actions";
import { useOptimistic, useRef } from "react";
import Button from "./button";

type Todo = {
	id: number;
	content: string;
};

type TodosComponentProps = {
	todos: Todo[];
};

export default function Todos({ todos }: TodosComponentProps) {
	const ref = useRef<HTMLFormElement>(null);

	const [optimisticTodo, setOptimisticTodo] = useOptimistic(
		todos,
		(state, newTodo: Todo) => {
			return [...state, newTodo];
		}
	);

	const formAction = async (formData: FormData) => {
		ref.current?.reset();
		setOptimisticTodo({
			id: Math.random(),
			content: formData.get("content") as string,
		});
		await addTodo(formData);
	};

	return (
		<>
			<form
				ref={ref}
				className="flex flex-col gap-4 w-[300px] my-16"
				action={formAction}
			>
				<input
					type="text"
					name="content"
					className="p-2"
					placeholder="Write your todo..."
					required
				/>
				<Button />
			</form>
			<ul className="list-disc">
				{optimisticTodo.map((todo) => (
					<li key={todo.id}>{todo.content}</li>
				))}
			</ul>
		</>
	);
}
