"use client";
import { addPet, checkOutPet, editPet } from "@/actions/actions";
import { TPet, TPetEssentials } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
	children: React.ReactNode;
	data: TPet[];
};

type TPetContext = {
	pets: TPet[];
	selectedPetId: TPet["id"] | null;
	selectedPet: TPet | undefined;
	numberOfPets: number;
	handleAddPet: (newPet: TPetEssentials) => Promise<void>;
	handleEditPet: (
		petId: TPet["id"],
		newPetData: TPetEssentials
	) => Promise<void>;
	handleCheckoutPet: (id: TPet["id"]) => Promise<void>;
	handleChangeSelectedPetId: (id: TPet["id"]) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
	children,
	data,
}: PetContextProviderProps) {
	// state
	const [optimisticPets, setOptimisticPets] = useOptimistic(
		data,
		(state, { action, payload }) => {
			switch (action) {
				case "add":
					return [
						...state,
						{ ...payload, id: Math.random().toString() },
					];
				case "edit":
					return state.map((pet) => {
						if (pet.id === payload.id) {
							return { ...pet, ...payload.newPetData };
						}
						return pet;
					});
				case "delete":
					return state.filter((pet) => pet.id !== payload);
				default:
					return state;
			}
		}
	);
	const [selectedPetId, setSelectedPetId] = useState<
		TPet["id"] | null
	>(null);

	// console.log(selectedPetId)

	// derived state
	const selectedPet = optimisticPets.find(
		(pet) => pet.id === selectedPetId
	);
	const numberOfPets = optimisticPets.length;

	//events
	const handleAddPet = async (newPet: TPetEssentials) => {
		setOptimisticPets({ action: "add", payload: newPet });
		const error = await addPet(newPet);
		if (error) {
			toast.warning(error.message);
			return;
		} else {
			toast.success(`'Pet added: ${newPet}`)
		}
	};

	const handleEditPet = async (
		petId: TPet["id"],
		newPetData: TPetEssentials
	) => {
		setOptimisticPets({
			action: "edit",
			payload: { id: petId, newPetData },
		});
		const error = await editPet(petId, newPetData);
		if (error) {
			toast.warning(error.message);
			return;
		} else {
			toast.success(`'Data modified'`)
		}
	};

	const handleCheckoutPet = async (petId: TPet["id"]) => {
		setOptimisticPets({ action: "delete", payload: petId });
		const error = await checkOutPet(petId);
		if (error) {
			toast.warning(error.message);
			return;
		} else {
			toast.success(`'Pet removed'`)
		}
		setSelectedPetId(null);
	};

	const handleChangeSelectedPetId = (id: TPet["id"]) => {
		setSelectedPetId(id);
	};

	return (
		<PetContext.Provider
			value={{
				pets: optimisticPets,
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
