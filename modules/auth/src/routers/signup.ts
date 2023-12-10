import { prismaAuth } from "@database/auth";
import { Elysia, InternalServerError, t } from "elysia";
import { emailParser, nameParser, passwordParser } from "../parsers";

export const signUp = new Elysia().post(
	"/signup",
	async ({ body, set }) => {
		const ctx = new prismaAuth();

		const noUser = await ctx.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (noUser) {
			set.status = 409;
			throw new Error("User already exists");
		}

		const user = await ctx.user.create({
			data: {
				email: body.email,
				password: await Bun.password.hash(body.password),
				name: body.name,
			},
		});

		if (!user) {
			throw new InternalServerError("Failed to create user");
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
			email: emailParser,
			name: nameParser,
			password: passwordParser,
		}),
	},
);
