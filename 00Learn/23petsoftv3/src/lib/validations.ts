import { z } from "zod";
import { PET_PLACEHOLDER } from "./constants";

export const petFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, { message: "Name must be at least 2 characters" })
		.max(20, { message: "Must be less than 20 " }),
	ownerName: z
		.string()
		.trim()
		.min(2, { message: "Owner name must be atleast 2 characters" })
		.max(20, { message: "must be less than 20" }),
	imageUrl: z.union([
		z.literal(""),
		z
			.string()
			.trim()
			.url({ message: "Image url must be a valid url" }),
	]),
	age: z.coerce.number().int().positive().max(99),
	notes: z.union([
		z.literal(""),
		z
			.string()
			.trim()
			.max(1000, { message: "must be less than 1000" }),
	]),
}).transform((data) => ({
   ...data,
   imageUrl: data.imageUrl || PET_PLACEHOLDER
}))