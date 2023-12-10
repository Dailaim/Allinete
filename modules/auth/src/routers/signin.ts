import { prismaAuth } from "@database/auth";
import { password } from "bun";
import { Elysia, InternalServerError, NotFoundError, t } from "elysia";
import { emailParser, passwordParser } from "../parsers";

export const signIn = new Elysia().post(
	"/signin",
	async ({ body, set }) => {
		const ctx = new prismaAuth();

		const user = await ctx.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (!user) {
			throw new NotFoundError("User not found");
		}

		if (!user.password) {
			throw new NotFoundError("Password not found");
		}

		const isMatch = await Bun.password.verify(user.password, body.password);

		if (!isMatch) {
			throw new NotFoundError("Password not match");
		}

		return {
			message: "Authorized",
			user: {
				id: user.id,
				email: user.email ?? "",
				name: user.name ?? "",
			},
		};
	},

	{
		body: t.Object({
			email: emailParser,
			password: passwordParser,
		}),

		response: {
			200: t.Object({
				message: t.String(),
				user: t.Object({
					id: t.String(),
					email: t.String(),
					name: t.String(),
				}),
			}),
		},
	},
);
