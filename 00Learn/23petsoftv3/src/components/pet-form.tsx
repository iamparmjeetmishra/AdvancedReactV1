"use client";
import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";
import { TPetBtnAction } from "@/lib/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PetFormProps = {
	actionType: TPetBtnAction;
	onFormSubmission: () => void;
};

const petFormSchema = z.object({
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
});

type TPetForm = z.infer<typeof petFormSchema>;

export default function PetForm({
	actionType,
	onFormSubmission,
}: PetFormProps) {
	const { selectedPet, handleAddPet, handleEditPet } =
		usePetContext();

	const {
		register,
		trigger,
		formState: { errors },
	} = useForm<TPetForm>({
		resolver: zodResolver(petFormSchema),
	});

	return (
		<form
			action={async (formData) => {
				const result = await trigger();
				if (!result) return;

				onFormSubmission();
				const petData = {
					name: formData.get("name") as string,
					ownerName: formData.get("ownerName") as string,
					imageUrl:
						(formData.get("imageUrl") as string) ||
						"/pet-placeholder.png",
					age: Number(formData.get("age")),
					notes: formData.get("notes") as string,
				};

				if (actionType === "add") {
					await handleAddPet(petData);
				} else if (actionType === "edit") {
					await handleEditPet(selectedPet!.id, petData);
				}
			}}
			className="space-y-3"
		>
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input id="name" {...register("name")} />
				{errors.name && (
					<span className="text-red-500">{errors.name.message}</span>
				)}
			</div>
			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner name</Label>
				<Input id="ownerName" {...register("ownerName")} />
				{errors.ownerName && (
					<span className="text-red-500">
						{errors.ownerName.message}
					</span>
				)}
			</div>
			<div className="space-y-1">
				<Label htmlFor="imageUrl">Image Url</Label>
				<Input id="imageUrl" {...register("imageUrl")} />
				{errors.imageUrl && (
					<span className="text-red-500">
						{errors.imageUrl.message}
					</span>
				)}
			</div>
			<div className="space-y-1">
				<Label htmlFor="age">Age</Label>
				<Input id="age" {...register("age")} />
				{errors.age && (
					<span className="text-red-500">{errors.age.message}</span>
				)}
			</div>
			<div className="space-y-1">
				<Label htmlFor="notes">Notes</Label>
				<Textarea id="notes" rows={4} {...register("notes")} />
				{errors.notes && (
					<span className="text-red-500">{errors.notes.message}</span>
				)}
			</div>
			<div className="flex justify-end ">
				<PetFormBtn actionType={actionType} />
			</div>
		</form>
	);
}
