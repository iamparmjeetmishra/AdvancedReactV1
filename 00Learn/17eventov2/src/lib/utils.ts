import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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