import { Slot, component$ } from "@builder.io/qwik";
import { NavbarProvider } from "./navbar";

export const Providers = component$(() => {
	return (
		<NavbarProvider>
			<Slot />
		</NavbarProvider>
	);
});
