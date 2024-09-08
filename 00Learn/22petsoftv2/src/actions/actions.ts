"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";


export async function addPet(formData) {
	await sleep(2000);
	try {
		await prisma.pet.create({
			data: {
				name: formData.get("name"),
				ownerName: formData.get("ownerName"),
				imageUrl: formData.get("imageUrl") || "/pet-placeholder.png",
				age: parseInt(formData.get("age")),
				notes: formData.get("notes"),
			},
		});
	} catch (error) {
		return {
			message: `"Could not add pet.", ${error}`,
		};
	}
	revalidatePath("/app", "layout");
}


export async function editPet(petId, formData) {
   try {
      await prisma.pet.update({
         where: {
            id: petId,
         },
         data: {
            name: formData.get("name"),
				ownerName: formData.get("ownerName"),
				imageUrl: formData.get("imageUrl") || "/pet-placeholder.png",
				age: parseInt(formData.get("age")),
				notes: formData.get("notes"),
         }
      })
   } catch (error) {
      return {
			message: `"Could not edit pet.", ${error}`,
		};
   }
	revalidatePath("/app", "layout");
}

export async function checkOutPet(petId) {
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