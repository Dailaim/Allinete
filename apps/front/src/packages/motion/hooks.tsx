import { noSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { stagger as val } from "motion";

export const useStragger = () => {
	const stagger = useSignal(noSerialize(val()));

	useVisibleTask$(() => {
		stagger.value = noSerialize(val());
	});
	return stagger;
};
