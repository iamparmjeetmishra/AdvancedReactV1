"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import {
	authSchema,
	petFormSchema,
	petIdSchema,
} from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { redirect } from "next/navigation";

// -- useraction -----

export async function logIn(formData: unknown) {
	// checking if formdata is a formdata type
	if (!(formData instanceof FormData)) {
		return {
			message: "Invalid form data",
		};
	}

	//Convert formdata to an object
	const formDataObject = Object.fromEntries(formData.entries());
	// validate the object
	const validatedFormDataObject =
		authSchema.safeParse(formDataObject);
	if (!validatedFormDataObject.success) {
		return {
			message: "Invalid form data",
		};
	}

	await signIn("credentials", validatedFormDataObject.data);
	redirect("/app/dashboard");
}

export async function logOut() {
	await signOut({ redirectTo: "/" });
}

export async function signUp(formData: unknown) {
	// check if formdata is a formdata type
	if (!(formData instanceof FormData)) {
		return {
			message: "Invalid form data",
		};
	}
	// convert formdata to plain object
	const formDataEntries = Object.fromEntries(formData.entries());

	//validation
	const validatedFormData = authSchema.safeParse(formDataEntries);
	if (!validatedFormData.success) {
		return {
			message: "Invalid form data",
		};
	}

	const { email, password } = validatedFormData.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.create({
		data: {
			email,
			hashedPassword,
		},
	});

	await signIn("credentials", formData);
}

// ---pet action ----
export async function addPet(pet: unknown) {
	// await sleep(2000);
	const session = await checkAuth();

	const validatedPet = petFormSchema.safeParse(pet);

	if (!validatedPet.success) {
		return {
			message: `"Pet data is invalid: ${validatedPet.error}"`,
		};
	}

	try {
		await prisma.pet.create({
			data: {
				...validatedPet.data,
				user: {
					connect: {
						id: session.user.id,
					},
				},
			},
		});
	} catch (error) {
		return {
			message: `"Could not add pet.", ${error}`,
		};
	}
	revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
	// auth check
	const session = await checkAuth();

	// validation
	const validatedId = petIdSchema.safeParse(petId);
	const validatedPet = petFormSchema.safeParse(newPetData);

	if (!validatedId.success || !validatedPet.success) {
		return {
			message: `"Pet data is invalid: ${validatedPet.error}"`,
		};
	}
	// authorization check

	const pet = await getPetById(validatedId.data);
	if (!pet) {
		return {
			message: "Pet not found",
		};
	}
	if (pet.userId !== session.user.id) {
		return {
			message: "Not authorized to edit.",
		};
	}

	// db mutation
	try {
		await prisma.pet.update({
			where: {
				id: validatedId.data,
			},
			data: validatedPet.data,
		});
	} catch (error) {
		return {
			message: `"Could not edit pet.", ${error}`,
		};
	}
	revalidatePath("/app", "layout");
}

export async function checkOutPet(petId: unknown) {
	// auth check
	const session = await checkAuth();

	// validation
	const validatedId = petIdSchema.safeParse(petId);

	if (!validatedId.success) {
		return {
			message: `"Unable to removed Pet: ${validatedId.error}"`,
		};
	}

	// authorization check ( user owns pet)
	const pet = await getPetById(validatedId.data);
	if (!pet) {
		return {
			message: "Pet not found.",
		};
	}

	if (pet.userId !== session.user.id) {
		return {
			message: "Not authorized.",
		};
	}

	// db mutation
	try {
		await prisma.pet.delete({
			where: {
				id: validatedId.data,
			},
		});
	} catch (error) {
		return {
			message: `Could not delete Pet. ${error}`,
		};
	}
	revalidatePath("/app", "layout");
}
