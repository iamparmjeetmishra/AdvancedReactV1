"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { TPet, TPetEssentials } from "@/lib/types";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcryptjs'
import { redirect } from "next/navigation";

// -- useraction -----

export async function logIn(formData: FormData) {
   const authData = Object.fromEntries(formData.entries())
   console.log(authData)
   await signIn('credentials', authData)
}

export async function logOut() {
   await signOut({ redirectTo: '/'})
}

export async function signUp(formData: FormData) {
   const hashedPassword = await bcrypt.hash(formData.get('password') as string, 10)
   
   await prisma.user.create({
      data: {
         email: formData.get('email') as string,
         hashedPassword
      }
   })

   await signIn('credentials', formData)
   
}



// ---pet action ----
export async function addPet(pet: TPetEssentials) {
   // await sleep(2000);
   const session = await auth()
   if (!session?.user) {
      redirect('/login')
   }

   const validatedPet = petFormSchema.safeParse(pet)

   if (!validatedPet.success) {
      return {
         message: `"Pet data is invalid: ${validatedPet.error}"`
      }
   }

	try {
      await prisma.pet.create({
         data: {
            ...validatedPet.data,
            user: {
               connect: {
                  id: session.user.id
               }
            }
      },
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
   // auth check
   const session = await auth()
   if (!session?.user) {
      redirect('/login')
   }

   // validation
   const validatedId = petIdSchema.safeParse(petId)

   if (!validatedId.success) {
      return {
         message: `"Unable to removed Pet: ${validatedId.error}"`
      }
   }

   // authorization check ( user owns pet)
   const pet = await prisma.pet.findUnique({
      where: {
         id: validatedId.data,
      }
   })

   if (!pet) {
      return {
         message: 'Pet not found.'
      }
   }

   if (pet.userId !== session.user.id) {
      return {
         message: 'Not authorized.'
      }
   }

   // db mutation
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