import type { AuthConfig } from "@auth/core";

import GitHub from "@auth/core/providers/github";
import { serverAuth$ } from "@builder.io/qwik-auth";

import { prismaAuth } from "@database/auth"
import { PrismaAdapter} from "@auth/prisma-adapter"


export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
	serverAuth$(
		({ env }) =>
			({
				debug: true,
				secret: env.get("AUTH_SECRET"),
				trustHost: true,
				providers: [
					GitHub({
						clientId: env.get("GITHUB_ID"),
						clientSecret: env.get("GITHUB_SECRET"),
					}),
				],
				adapter: PrismaAdapter(new prismaAuth()),
				/* adapter: SurrealDBAdapter(DB(env) as any), */
			}) as AuthConfig,
	);
