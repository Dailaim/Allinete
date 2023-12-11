import { $ } from "@builder.io/qwik";
import { Maybe, SubmitHandler } from "@modular-forms/qwik";
import type { SchemaForm } from "./types";

export const handlerAddToBag = $<Maybe<SubmitHandler<SchemaForm>>>((e) => {
	console.log("loginForm", e);
	// TODO: Add to bag logic here
});
