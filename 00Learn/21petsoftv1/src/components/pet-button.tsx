"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";

type action = "add" | "edit" | "checkout";

type PetButtonProp = {
	actionType: action;
	className?: string;
   onClick?: () => void;
   
};

export default function PetButton({
	actionType,
	className,
	onClick,
}: PetButtonProp) {
   const [isFormOpen, setIsFormOpen] = useState(false)

	if (actionType === "checkout") {
		return (
			<Button
				onClick={onClick}
				className={className}
				variant="secondary"
			>
				Checkout
			</Button>
		);
	}
	return (
		<Dialog open={isFormOpen} onOpenChange={setIsFormOpen} >
			<DialogTrigger asChild>
				{actionType === "add" ? (
					<Button onClick={onClick} className={className} size="icon">
						<PlusIcon />
					</Button>
				) : (
					<Button
						onClick={onClick}
						className={className}
						variant="secondary"
					>
						Edit
					</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{actionType === "add" ? "Add a new pet" : "Edit pet"}
					</DialogTitle>
				</DialogHeader>
            <PetForm
               actionType={actionType}
               onFormSubmission={() => setIsFormOpen(false)}
            />
			</DialogContent>
		</Dialog>
	);
}
