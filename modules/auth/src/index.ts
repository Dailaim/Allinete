import { Elysia, t } from "elysia";
import { checkAuth } from "./routers/check";

export const authApp = new Elysia().use(checkAuth)

