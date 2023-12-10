import { prismaAuth } from "@database/auth";
import { Elysia, NotFoundError, t } from "elysia";
import { AccessToken } from "../const";

export const checkAuth = new Elysia().post(
	"/check",
	async ({ cookie, set }) => {
		const token = cookie[AccessToken]?.get();

		if (!token) {
			return new NotFoundError("Token not found");
		}

		const ctx = new prismaAuth();
		const sess = await ctx.session.findUnique({
			where: {
				sessionToken: token,
				AND: {
					expires: {
						gt: new Date(),
					},
				},
			},
		});

		if (!sess) {
			return new NotFoundError("Session not found");
		}

		return {
			message: "Authorized",
		};
	},
	{
		response: {
			200: t.Object({
				message: t.String(),
			}),
			401: t.Object({
				error: t.String(),
			}),
		},
		cookie: t.Cookie({
			[AccessToken]: t.Optional(t.String()),
		}),
	},
);
