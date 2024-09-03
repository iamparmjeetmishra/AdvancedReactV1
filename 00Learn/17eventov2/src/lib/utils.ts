import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import { notFound } from "next/navigation";
import { FIX_EVENT_ITEMS } from "./constants";

export const TextCapitalize = (text: string): string => {
	if (!text) return text;
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export function cn(...classes: ClassValue[]) {
	return twMerge(clsx(classes));
}

export async function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

// Event data

export async function getEvents(city: string, page = 1) {
	try {
		const filterCity =
			city === "all" ? undefined : TextCapitalize(city);
		const events = await prisma.eventoEvent.findMany({
			where: {
				city: filterCity,
			},
			take: FIX_EVENT_ITEMS,
			skip: (page - 1) * FIX_EVENT_ITEMS,
			orderBy: {
				date: "asc",
			},
		});

		let totalCount;
		if (city === "all") {
			totalCount = await prisma.eventoEvent.count();
		} else {
			totalCount = await prisma.eventoEvent.count({
				where: {
					city: TextCapitalize(city),
				},
			});
		}

		if (!events) {
			return notFound();
		}
		return { events, totalCount };
	} catch (error) {
		console.log("Error Fetching events:", error);
		return notFound();
	}
}

export async function getEvent(slug: string) {
	try {
		const event = await prisma.eventoEvent.findUnique({
			where: {
				slug: slug,
			},
		});
		if (!event) {
			return notFound();
		}
		return event;
	} catch (error) {
		console.log("Error fetching event", error);
		return notFound();
	}
}
