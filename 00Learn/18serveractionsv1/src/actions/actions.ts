"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {
	const content = formData.get("content");

	if (typeof content !== "string") {
		throw new Error("Invalid content type");
	}

	try {
		await prisma.todos.create({
			data: {
				content: content,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Creating todo:", error.message);
		} else {
			console.error("An unkown error occured:", error);
		}
	}
	revalidatePath("/");
};
