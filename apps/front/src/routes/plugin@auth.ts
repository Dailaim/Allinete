import type { AuthConfig } from "@auth/core";

import GitHub from "@auth/core/providers/github";
import { serverAuth$ } from "@builder.io/qwik-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaAuth } from "@database/auth";

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
				adapter: PrismaAdapter(new prismaAuth()),
			}) as AuthConfig,
	);
