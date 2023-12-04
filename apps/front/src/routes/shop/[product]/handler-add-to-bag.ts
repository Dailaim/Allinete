import type { QwikSubmitEvent } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import type { SchemaForm } from "./types";

export const handlerAddToBag = $<
	(e: SchemaForm, a: QwikSubmitEvent<HTMLFormElement>) => void
>((e) => {
	console.log("loginForm", e);

	// TODO: Add to bag logic here
});
