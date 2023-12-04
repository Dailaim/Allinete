import { Slot, component$ } from "@builder.io/qwik";
import { MotionProvider } from "~/packages/motion";
import { NavbarProvider } from "./navbar";
import { ScrollProvider } from "./scroll";

export const Providers = component$(() => {
	return (
		<ScrollProvider>
			<MotionProvider>
				<NavbarProvider>
					<Slot />
				</NavbarProvider>
			</MotionProvider>
		</ScrollProvider>
	);
});
