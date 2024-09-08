
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type TPetFormBtnProps = {
   actionType: "add" | "edit";
}

export default function PetFormBtn({
   actionType
}: TPetFormBtnProps) {
	const { pending } = useFormStatus()

	return (
		<Button disabled={pending} type="submit">
			{actionType === "add" ? "Add a new pet" : "Edit pet"}
		</Button>
	);
}
