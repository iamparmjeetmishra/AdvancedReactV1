import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import toast from "react-hot-toast";

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

export async function getEvents(city: string) {
	try {
		const filterCity = city === 'all' ? undefined : TextCapitalize(city)
		const events = await prisma.eventoEvent.findMany({
			where: {
				city: filterCity,
			},
			orderBy: {
				date: "asc"
			}
		});
		return events
	} catch (error) {
		console.log('Error Fetching events:', error)
		toast.error('Error while fetching')
		throw new Error('Failed to fetch events')
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
			let msg = `Event with slug ${slug} not found`
			toast.error(msg)
			throw new Error(msg)
		}
		return event
	} catch (error) {
		console.log('Error fetching event', error)
		toast.error('Failed to fetch event')
		throw new Error('failed to fetch event')
	}
	return event;
}
