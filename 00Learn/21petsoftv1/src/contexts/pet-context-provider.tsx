"use client";
import { PetProp } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
	children: React.ReactNode;
	data: PetProp[];
};

type TPetContext = {
	pets: PetProp[];
	selectedPet: PetProp | undefined;
	selectedPetId: number | null;
	numberOfPets: number;
	handleChangeSelectedPetId: (id: number) => void;
	handleCheckoutPet: (id: number) => void;
	handleAddPet: (newPet: PetProp) => void;
	handleEditPet: (petId: number, newPetData: PetProp) => void
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
	children,
	data,
}: PetContextProviderProps) {
	// state
	const [pets, setPets] = useState(data);
	const [selectedPetId, setSelectedPetId] = useState<number | null>(
		null
	);

	// console.log(selectedPetId)

	// derived state
	const selectedPet = pets.find((pet) => pet.id === selectedPetId);
	const numberOfPets = pets.length;

	//events
	const handleChangeSelectedPetId = (id: number) => {
		setSelectedPetId(id);
	};

	const handleCheckoutPet = (id: number) => {
		setPets((prev) => prev.filter((pet) => pet.id !== id));
		setSelectedPetId(null);
	};

	const handleAddPet = (newPet: PetProp) => {
		setPets((prev) => [...prev, newPet]);
	};

	const handleEditPet = (petId: number, newPetData: PetProp) => {
		setPets((prev) =>
			prev.map((pet) => {
				if (pet.id === petId) {
					return {
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
