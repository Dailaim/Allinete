import { logger } from "@bogeychan/elysia-logger";
import { handlerErrors } from "@utils/elysia";
import { Elysia, t } from "elysia";
import { authApp } from ".";

const app = new Elysia()
	.get("/", () => "Hello World")
	.use(
		logger({
			autoLogging: true,
			errorKey: "error",
		}),
	)
	.use(handlerErrors)
	.use(authApp)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
