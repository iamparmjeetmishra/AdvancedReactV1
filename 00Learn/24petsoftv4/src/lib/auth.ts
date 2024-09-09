import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";

const config = {
	pages: {
		signIn: "/login",
	},
	session: {
		maxAge: 30 * 24 * 60 * 60,
		strategy: "jwt",
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				// runs on login
				const { email, password } = credentials;

				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});
				if (!user) {
					console.log("No User found");
					return null;
				}

				const passwordMatch = await bcrypt.compare(
					password,
					user.hashedPassword
				);
				if (!passwordMatch) {
					console.log("Passwords do not match");
					return null;
				}

				return user;
			},
		}),
	],
	callbacks: {
		authorized: ({ auth, request }) => {
			const isLoggedIn = Boolean(auth?.user)
         const isTryingToAccessApp =
				request.nextUrl.pathname.includes("/app");

         if (!isLoggedIn && isTryingToAccessApp) {
            return false
         }
         if (isLoggedIn && isTryingToAccessApp) {
            return true
         }

         if (isLoggedIn && !isTryingToAccessApp) {
            return Response.redirect(new URL("app/dashboard", request.nextUrl))
         }

         if (!isLoggedIn && !isTryingToAccessApp) {
            return true
         }
		},
	},
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
