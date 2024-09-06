"use server";

import { prisma } from "@/lib/db";

export const addTodo = async (formData: FormData) => {
	const content = formData.get("content");

	await prisma.todos.create({
		data: {
			content: content as string,
		},
	});

	return {
		success: true,
	};
};
