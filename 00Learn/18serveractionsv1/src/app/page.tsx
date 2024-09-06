import Todos from "@/components/todos";
import { prisma } from "@/lib/db";

export default async function Home() {
	const todos = await prisma.todos.findMany();

	console.log("todos", todos);

	

	return (
		<main className="bg-white/60 text-black flex min-h-screen flex-col items-center w-full p-24">
			<h1 className="text-2xl font-bold">Todos Page</h1>
      <Todos todos={todos} />
		</main>
	);
}
