import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { checkAuth } from "./routers/check";
import { signIn } from "./routers/signin";
import { signUp } from "./routers/signup";

export const authApp = new Elysia()
	.use(
		cors({
			credentials: true,
			origin: /^http:\/\/localhost(:\d+)?$/,
			allowedHeaders: [
				"Content-Type",
				"Authorization",
				"credentials",
				"X-Requested-With",
				"Accept",
				"Origin",
				"cors",
				"cookie",
				"Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin",
				"Access-Control-Allow-Credentials",
			],
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			preflight: true,
			exposedHeaders: [
				"Authorization",
				"credentials",
				"Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin",
				"Access-Control-Allow-Credentials",
				"Content-Type",
				"X-Requested-With",
				"Accept",
				"Origin",
				"cors",
			],
		}),
	)
	.use(checkAuth)
	.use(signIn)
	.use(signUp);
