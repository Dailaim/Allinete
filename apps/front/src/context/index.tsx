import { Slot, component$ } from "@builder.io/qwik";
import { MotionProvider } from "~/packages/motion";
import { NavbarProvider } from "./navbar";

export const Providers = component$(() => {
	return (
		<MotionProvider>
			<NavbarProvider>
				<Slot />
			</NavbarProvider>
		</MotionProvider>
	);
});
