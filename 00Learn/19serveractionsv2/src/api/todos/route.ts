import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { content } = await request.json();

	await prisma.todos.create({
		data: {
			content: content as string,
		},
	});

	return NextResponse.json({ success: true });
}
