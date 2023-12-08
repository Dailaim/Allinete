import { prismaAuth } from "@database/auth";
import { Elysia, t } from "elysia";
import { AccessToken } from "../const";

export const checkAuth = new Elysia().post(
	"/signin",
	async ({ cookie, set }) => {
		const Token = cookie[AccessToken];

		if (!Token.get()) {
			set.status = 401;
			return {
				error: "Unauthorized",
			};
		}

		const ctx = new prismaAuth();
		const sess = await ctx.session.findUnique({
			where: {
				sessionToken: Token.get(),
				AND: {
					expires: {
						gt: new Date(),
					},
				},
			},
		});

		if (!sess) {
			set.status = 401;
			return {
				error: "Unauthorized",
			};
		}

		set.status = 200;
		return {
			message: "Authorized",
		};
	},
	{
		cookie: t.Cookie({
			[AccessToken]: t.Optional(t.String()),
		}),
	},
);
