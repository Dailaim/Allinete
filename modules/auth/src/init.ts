import { Elysia, t } from "elysia";
import { authApp } from ".";

const app = new Elysia().use(authApp).listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
