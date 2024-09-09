"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { TPet, TPetEssentials } from "@/lib/types";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";


// -- useraction -----

export async function logIn(formData: FormData) {
   const authData = Object.fromEntries(formData.entries())
   console.log(authData)
   await signIn('credentials', authData)
}

export async function logOut() {
   await signOut({ redirectTo: '/'})
}



// ---pet action ----
export async function addPet(pet: TPetEssentials) {
   // await sleep(2000);
   
   const validatedPet = petFormSchema.safeParse(pet)

   if (!validatedPet.success) {
      return {
         message: `"Pet data is invalid: ${validatedPet.error}"`
      }
   }

	try {
		await prisma.pet.create({
			data: validatedPet.data,
		});
	} catch (error) {
		return {
			message: `"Could not add pet.", ${error}`,
		};
	}
	revalidatePath("/app", "layout");
}


export async function editPet(petId: TPet['id'], newPetData: TPetEssentials) {

   const validatedId = petIdSchema.safeParse(petId)

   const validatedPet = petFormSchema.safeParse(newPetData)

   if (!validatedId.success || !validatedPet.success) {
      return {
         message: `"Pet data is invalid: ${validatedPet.error}"`
      }
   }


   try {
      await prisma.pet.update({
         where: {
            id: validatedId.data,
         },
         data: validatedPet.data,
      })
   } catch (error) {
      return {
			message: `"Could not edit pet.", ${error}`,
		};
   }
	revalidatePath("/app", "layout");
}

export async function checkOutPet(petId: TPet["id"]) {

   const validatedId = petIdSchema.safeParse(petId)

   if (!validatedId.success) {
      return {
         message: `"Unable to removed Pet: ${validatedId.error}"`
      }
   }

   try {
      await prisma.pet.delete({
         where: {
            id: validatedId.data
         }
      })
   } catch (error) {
      return {
         message: `Could not delete Pet. ${error}`
      }
   }
	revalidatePath("/app", "layout");
}