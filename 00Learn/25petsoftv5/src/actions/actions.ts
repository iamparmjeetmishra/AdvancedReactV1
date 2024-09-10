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
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { sleep } from "@/lib/utils";
import { redirect } from "next/navigation";


// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// -- useraction -----

export async function logIn(prevState: unknown, formData: unknown) {
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

	try {
		await signIn("credentials", formData);
		// redirect("/app/dashboard");
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return {
						message: "Invalid credentials.",
					};
				}
				default: {
					return {
						message: "Error: Could not signin.",
					};
				}
			}
		}
		throw error;
	}

	
}

export async function logOut() {
	await sleep(1000)
	await signOut({ redirectTo: "/" });
}

export async function signUp(prevState: unknown, formData: unknown) {
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

	try {
		await prisma.user.create({
			data: {
				email,
				hashedPassword,
			},
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return {
					message: `Email already exists`,
				};
			}
		} else {
			return {
				message: "Could not create user.",
			};
		}
	}

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



// _-----payments-----

export async function createCheckoutSession() {
	//auth check
	const session = await checkAuth()

	// create checkout session
	const checkOutSession = await stripe.checkout.sessions.create({
		customer_email: session.user.email,
		line_items: [
			{
				price: process.env.STRIPE_PRICE_ID,
				quantity: 1,
			}
		],
		mode: 'payment',
		success_url: `${process.env.BASE_URL}/payment?success=true`,
		cancel_url: `${process.env.BASE_URL}/payment?cancelled=true`,
	})

	// redirect user
	redirect(checkOutSession.url)
}