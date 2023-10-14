import type { AuthConfig } from "@auth/core";

import GitHub from "@auth/core/providers/github";
import { serverAuth$ } from "@builder.io/qwik-auth";
import type { SurrealWebSocket } from "surrealdb.js";
import { SurrealDBAdapter } from "~/libs/surrealdbAuthApdapter";
import { db } from "~/server/db";

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
				],
				adapter: SurrealDBAdapter(db as unknown as Promise<SurrealWebSocket>),
			}) as AuthConfig,
	);
