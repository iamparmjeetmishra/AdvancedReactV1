"use client";
import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPet, editPet } from "@/actions/actions";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";
// import { useFormState } from "react-dom";

type PetFormProps = {
	actionType: "add" | "edit";
	onFormSubmission: () => void;
};

export default function PetForm({
	actionType,
	onFormSubmission,
}: PetFormProps) {
	const { selectedPet } = usePetContext();

	return (
		<form
			action={async (formData) => {
				if (actionType === "add") {
					const error = await addPet(formData);
					if (error) {
						toast.warning(error.message);
						return;
					}
				} else if (actionType === "edit") {
					const error = await editPet(selectedPet?.id, formData);
					if (error) {
						toast.warning(error.message);
						return;
					}
				}
				onFormSubmission();
			}}
			className="space-y-3"
		>
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					name="name"
					type="text"
					required
					defaultValue={
						actionType === "edit" ? selectedPet?.name : ""
					}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="ownerName">Owner name</Label>
				<Input
					id="ownerName"
					name="ownerName"
					type="text"
					required
					defaultValue={
						actionType === "edit" ? selectedPet?.ownerName : ""
					}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="imageUrl">Image Url</Label>
				<Input
					id="imageUrl"
					name="imageUrl"
					type="text"
					defaultValue={
						actionType === "edit" ? selectedPet?.imageUrl : ""
					}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="age">Age</Label>
				<Input
					id="age"
					name="age"
					type="number"
					required
					defaultValue={actionType === "edit" ? selectedPet?.age : ""}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="notes">Notes</Label>
				<Textarea
					id="notes"
					name="notes"
					rows={4}
					required
					defaultValue={
						actionType === "edit" ? selectedPet?.notes : ""
					}
				/>
			</div>
			<div className="flex justify-end ">
				<PetFormBtn actionType={actionType} />
			</div>
		</form>
	);
}

// export default function PetForm({
// 	actionType,
// 	onFormSubmission,
// }: PetFormProps) {
// 	const { selectedPet } = usePetContext();
// 	const [error, formAction] = useFormState(addPet, {});

// 	return (
// 		<form
// 			action={formAction}
// 			// action={async (formData) => {
// 			// const error = await addPet(formData)
// 			// if (error) {
// 			// 	toast.warning(error.message)
// 			// 	return
// 			// }
// 			// onFormSubmission()
// 			// }}
// 			className="space-y-3"
// 		>
// 			{error && <p className="text-red-500">{ error.message}</p>}
// 			<div className="space-y-1">
// 				<Label htmlFor="name">Name</Label>
// 				<Input
// 					id="name"
// 					name="name"
// 					type="text"
// 					required
// 					defaultValue={
// 						actionType === "edit" ? selectedPet?.name : ""
// 					}
// 				/>
// 			</div>
// 			<div className="space-y-1">
// 				<Label htmlFor="ownerName">Owner name</Label>
// 				<Input
// 					id="ownerName"
// 					name="ownerName"
// 					type="text"
// 					required
// 					defaultValue={
// 						actionType === "edit" ? selectedPet?.ownerName : ""
// 					}
// 				/>
// 			</div>
// 			<div className="space-y-1">
// 				<Label htmlFor="imageUrl">Image Url</Label>
// 				<Input
// 					id="imageUrl"
// 					name="imageUrl"
// 					type="text"
// 					defaultValue={
// 						actionType === "edit" ? selectedPet?.imageUrl : ""
// 					}
// 				/>
// 			</div>
// 			<div className="space-y-1">
// 				<Label htmlFor="age">Age</Label>
// 				<Input
// 					id="age"
// 					name="age"
// 					type="number"
// 					required
// 					defaultValue={actionType === "edit" ? selectedPet?.age : ""}
// 				/>
// 			</div>
// 			<div className="space-y-1">
// 				<Label htmlFor="notes">Notes</Label>
// 				<Textarea
// 					id="notes"
// 					name="notes"
// 					rows={4}
// 					required
// 					defaultValue={
// 						actionType === "edit" ? selectedPet?.notes : ""
// 					}
// 				/>
// 			</div>
// 			<div className="flex justify-end ">
// 				<PetFormBtn actionType={actionType} />
// 			</div>
// 		</form>
// 	);
// }
