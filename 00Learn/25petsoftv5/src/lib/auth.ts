import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validations";

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
				//validation
				const validatedFormData = authSchema.safeParse(credentials);
				if (!validatedFormData.success) {
					return null;
				}

				// extract values
				const { email, password } = validatedFormData.data;

				const user = await getUserByEmail(email);
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
			const isLoggedIn = Boolean(auth?.user);
			const isTryingToAccessApp =
				request.nextUrl.pathname.includes("/app");

			if (!isLoggedIn && isTryingToAccessApp) {
				return false;
			}
			if (
				isLoggedIn &&
				isTryingToAccessApp &&
				!auth?.user.hasAccess
			) {
				return Response.redirect(
					new URL("/payment", request.nextUrl)
				);
			}
			if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
				return true;
			}

			if (isLoggedIn && !isTryingToAccessApp) {
				if (
					(request.nextUrl.pathname.includes("/login") ||
						request.nextUrl.pathname.includes("/signup")) &&
					!auth?.user.hasAccess
				) {
					return Response.redirect(
						new URL("/payment", request.nextUrl)
					);
				}
				return true;
			}

			if (!isLoggedIn && !isTryingToAccessApp) {
				return true;
			}
			return false;
		},
		jwt: ({ token, user }) => {
			if (user) {
				// on signin
				token.userId = user.id;
				token.hasAccess = user.hasAccess;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (session.user) {
				session.user.id = token.userId;
				session.user.hasAccess = token.hasAcess;
			}
			return session;
		},
	},
} satisfies NextAuthConfig;

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(config);
