"use server";

import prisma from "@/lib/db";
import { TPet, TPetEssentials } from "@/lib/types";
import { revalidatePath } from "next/cache";


export async function addPet(pet: TPetEssentials) {
	// await sleep(2000);
	try {
		await prisma.pet.create({
			data: pet,
		});
	} catch (error) {
		return {
			message: `"Could not add pet.", ${error}`,
		};
	}
	revalidatePath("/app", "layout");
}


export async function editPet(petId: TPet['id'], newPetData: TPetEssentials) {
   try {
      await prisma.pet.update({
         where: {
            id: petId,
         },
         data: newPetData,
      })
   } catch (error) {
      return {
			message: `"Could not edit pet.", ${error}`,
		};
   }
	revalidatePath("/app", "layout");
}

export async function checkOutPet(petId: TPet["id"]) {
   try {
      await prisma.pet.delete({
         where: {
            id: petId
         }
      })
   } catch (error) {
      return {
         message: `Could not delete Pet. ${error}`
      }
   }
	revalidatePath("/app", "layout");
}