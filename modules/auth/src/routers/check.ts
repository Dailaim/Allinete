import { Elysia, t } from "elysia";
import { AccessToken } from "../const";

export const checkAuth = new Elysia().post(
	"/signin",
	({ cookie, set }) => {
		const Token = cookie[AccessToken];

		if (!Token) {
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
