import { type HtmlHTMLAttributes, Slot, component$ } from "@builder.io/qwik";

export type ButtonTextProps = HtmlHTMLAttributes<HTMLButtonElement>;

export const ButtonText = component$<ButtonTextProps>(
	({ class: ClassName, ...props }) => {
		return (
			<button
				{...props}
				type="button"
				class={[
					"hover:text-pink text-black",
					"transition-all duration-200 ease-in-out",
					//@ts-ignore
					ClassName,
				]}
			>
				<Slot />
			</button>
		);
	},
);
