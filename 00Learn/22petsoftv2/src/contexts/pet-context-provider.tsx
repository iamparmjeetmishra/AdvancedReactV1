"use client";
import { addPet } from "@/actions/actions";
import { PetProp } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
	children: React.ReactNode;
	data: PetProp[];
};

type TPetContext = {
	pets: PetProp[];
	selectedPet: PetProp | undefined;
	selectedPetId: string | null;
	numberOfPets: number;
	handleChangeSelectedPetId: (id: string) => void;
	handleCheckoutPet: (id: string) => void;
	handleAddPet: (newPet: Omit<PetProp, "id">) => void;
	handleEditPet: (petId: string, newPetData: Omit<PetProp, "id">) => void
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
	children,
	data: pets,
}: PetContextProviderProps) {
	// state

	const [selectedPetId, setSelectedPetId] = useState<string | null>(
		null
	);

	// console.log(selectedPetId)

	// derived state
	const selectedPet = pets.find((pet) => pet.id === selectedPetId);
	const numberOfPets = pets.length;

	//events
	const handleChangeSelectedPetId = (id: string) => {
		setSelectedPetId(id);
	};

	const handleCheckoutPet = (id: string) => {
		setPets((prev) => prev.filter((pet) => pet.id !== id));
		setSelectedPetId(null);
	};

	const handleAddPet = async (newPet: Omit<PetProp, "id">) => {
		await addPet(newPet)
	};

	const handleEditPet = (petId: string, newPetData: Omit<PetProp, "id">) => {
		setPets((prev) =>
			prev.map((pet) => {
				if (pet.id === petId) {
					return {
						id: petId,
						...newPetData,
					};
				}
				return pet;
			})
		);
	};

	return (
		<PetContext.Provider
			value={{
				pets,
				selectedPetId,
				selectedPet,
				numberOfPets,
				handleChangeSelectedPetId,
				handleCheckoutPet,
				handleAddPet,
				handleEditPet,
			}}
		>
			{children}
		</PetContext.Provider>
	);
}
