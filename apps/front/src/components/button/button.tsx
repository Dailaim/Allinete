import { Slot, component$ } from "@builder.io/qwik";
import { LinkOrButton } from "./link-or-button";

export const variants = {
	primary: "bg-pink text-white",
	secondary: "bg-white border border-black text-black",
	default: "backdrop-blur-[2px] bg-pink-light bg-opacity-20 text-black",
};

export type ButtonProps = LinkOrButton & {
	variant?: keyof typeof variants;
};

export const Button = component$<ButtonProps>(
	({ variant = "default", class: ClassName, ...props }) => {
		return (
			<LinkOrButton
				{...props}
				class={[
					"rounded text-sm capitalize p-2.5 inline-flex justify-center items-center ",
					//TODO: fix this
					// " hover:bg-gradient-to-r hover:from-neutral-800 hover:via-neutral-700 hover:to-zinc-800 hover:text-white",

					"hover:bg-black hover:text-white",
					"focus:bg-pink focus:text-white",

					"transition-all duration-200 ease-in-out",
					variants[variant],
					//@ts-ignore
					ClassName,
				]}
			>
				<Slot />
			</LinkOrButton>
		);
	},
);
