import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { EventoEvent } from "@prisma/client";

export const TextCapitalize = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export function cn(...classes: ClassValue[]) {
	return twMerge(clsx(classes));
}

export async function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export async function getEvents(city: string) {
	const response = await fetch(
		`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`
	);
	const events: EventoEvent[] = await response.json();
	return events;
}

export async function getEvent(slug: string) {
	const response = await fetch(
		`https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
	);
	const event: EventoEvent = await response.json();
	return event;
}
