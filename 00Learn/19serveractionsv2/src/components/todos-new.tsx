import { addTodo } from "@/actions/actions";

export default function TodosNew() {
	return (
		<div className="flex flex-col">
			<form
				className="flex flex-col gap-4 w-[300px] my-16"
				action={addTodo}
			>
				<h2>Server Action</h2>
				<input
					type="text"
					name="content"
					className="p-2"
					placeholder="Write your todo..."
					required
				/>
				<button className="bg-cyan-500 text-white font-semibold py-2 px-6">
					Add
				</button>
				{/* <Button /> */}
			</form>
		</div>
	);
}
