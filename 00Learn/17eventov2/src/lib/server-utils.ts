// Event data

import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { FIX_EVENT_ITEMS } from "./constants";
import prisma from "./db";
import { TextCapitalize } from "./utils";

export const getEvents = unstable_cache(
	async (city: string, page = 1) => {
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
);

export const getEvent = unstable_cache(async (slug: string) => {
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
});
