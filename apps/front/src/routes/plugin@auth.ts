import type { AuthConfig } from "@auth/core";
import Email from "@auth/core/providers/email";

import GitHub from "@auth/core/providers/github";
import { serverAuth$ } from "@builder.io/qwik-auth";

import { SurrealDBAdapter } from "@auth/surrealdb-adapter";
import { DB } from "~/server/database";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
	serverAuth$(
		({ env }) =>
			({
				secret: env.get("AUTH_SECRET"),
				trustHost: true,

				providers: [
					GitHub({
						clientId: env.get("GITHUB_ID"),
						clientSecret: env.get("GITHUB_SECRET"),
					}),
					Email({
						server: {
							host: env.get("EMAIL_SERVER_HOST"),
							port: env.get("EMAIL_SERVER_PORT"),
							auth: {
								user: env.get("EMAIL_SERVER_USER"),
								pass: env.get("EMAIL_SERVER_PASSWORD"),
							},
						},
						from: env.get("EMAIL_FROM"),
					}),
				],
				adapter: SurrealDBAdapter(DB(env)),
			}) as AuthConfig,
	);
