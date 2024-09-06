import TodosNew from "@/components/todos-new";
import TodosOld from "@/components/todos-old";
import { prisma } from "@/lib/db";

export default async function Home() {
	const todos = await prisma.todos.findMany();

	return (
		<main className="bg-white/60 text-black flex min-h-screen flex-col items-center w-full p-24">
			<h1 className="text-2xl font-bold">Todos Page</h1>
			<div className="flex gap-2">
				<TodosOld />
				<TodosNew />
			</div>
			<div className="border p-6 rounded-md">
				<ul className="list-disc">
				{todos.map((todo) => (
					<li key={todo.id}>{todo.content}</li>
				))}
			</ul>
			</div>
		</main>
	);
}
