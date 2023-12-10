import type { AuthConfig } from "@auth/core";
import wretch from "wretch";

import GitHub from "@auth/core/providers/github";

import Credentials from "@auth/core/providers/credentials";

import { serverAuth$ } from "@builder.io/qwik-auth";

import type { User as AuthUser } from "@auth/core/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { $ } from "@builder.io/qwik";
import { prismaAuth } from "@database/auth";

const authFetch = wretch("http://localhost:3000/").options({
	credentials: "include",
});

interface User {
	name: string;
	email: string;
	password: string;
}

const Login = $((type: "signin" | "signup", user: User) => {
	return authFetch
		.url(type)
		.post(user)
		.unauthorized((e) => {
			return null;
		})
		.json((r) => r.user as Promise<User>);
});

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
	serverAuth$(
		({ env }) =>
			({
				secret: env.get("AUTH_SECRET"),
				trustHost: true,
				debug: false,

				providers: [
					Credentials({
						credentials: {
							name: { label: "Name", type: "text" },
							email: { label: "Email", type: "text" },
							password: { label: "Password", type: "password" },
							isRegister: { label: "isRegister", type: "checkbox" },
						},

						async authorize(credentials) {
							const { isRegister, callbackUrl, ...user } =
								credentials as User & {
									callbackUrl: string;
									isRegister: string | boolean;
								};
							callbackUrl;
							const authUser = (await Login(
								isRegister === "true" || isRegister === true
									? "signup"
									: "signin",
								user,
							).catch(() => {
								return null;
							})) as AuthUser | null;

							return authUser;
						},
					}),

					GitHub({
						clientId: env.get("GITHUB_ID"),
						clientSecret: env.get("GITHUB_SECRET"),
					}),
				],

				adapter: PrismaAdapter(new prismaAuth()),

				callbacks: {
					redirect({ url }) {
						return url;
					},
				},

				pages: {
					error: "/",
				},
			}) as AuthConfig,
	);
