import { prismaAuth } from "@database/auth";
import { Elysia, t } from "elysia";

export const checkAuth = new Elysia().post(
	"/signin",
	async ({ body, set }) => {
		if (!body.email || !body.password) {
			set.status = 401;
			return {
				error: "Unauthorized",
			};
		}

		const ctx = new prismaAuth();

		const user = await ctx.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (!user || !user.password) {
			set.status = 401;
			return {
				error: "Unauthorized",
			};
		}

		const isMatch = await Bun.password.verify(user.password, body.password);

		if (!isMatch) {
			set.status = 401;
			return {
				error: "Unauthorized",
			};
		}

		return {
			message: "Authorized",
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		};
	},
	{
		body: t.Object({
			email: t.String(),
			password: t.String(),
		}),
		// response: t.Object({
		// 	message: t.String(),
		// 	user: t.Optional(t.Object({
		// 		id: t.String(),
		// 		email: t.String(),
		// 		name: t.String(),
		// 	})),
		// }),
	},
);
