import { t } from "elysia";

export const nameParser = t.String({
	minLength: 3,
});

export const emailParser = t.String({
	format: "email",
});

export const passwordParser = t.String({
	minLength: 8,
});
