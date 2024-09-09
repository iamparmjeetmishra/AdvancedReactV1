import { Pet, User } from "@prisma/client";

export type TPet = Pet

export type TPetEssentials = Omit<Pet, "id" | "createdAt" | "updatedAt">;

export type TPetBtnAction = "add" | "edit";

export type TUser = User