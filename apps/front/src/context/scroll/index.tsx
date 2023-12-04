import type { Signal } from "@builder.io/qwik";
import {
	Slot,
	component$,
	createContextId,
	useContext,
	useContextProvider,
	useSignal,
	useVisibleTask$,
} from "@builder.io/qwik";

export const scrollContext = createContextId<Signal<boolean>>("scroll-context");

export const useScrollContext = () => {
	return useContext(scrollContext);
};

export const ScrollProvider = component$(() => {
	const scroll = useSignal(true);

	useVisibleTask$(({ track }) => {
		track(() => scroll.value);

		if (!scroll.value) {
			document.body.style.overflow = "hidden";
			document.body.style.height = "100vh";
			return;
		}

		document.body.style.overflow = "auto";
		document.body.style.height = "auto";
	});

	useContextProvider(scrollContext, scroll);

	return <Slot />;
});
