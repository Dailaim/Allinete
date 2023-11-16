import { type HtmlHTMLAttributes, Slot, component$ } from "@builder.io/qwik";

export type ButtonTextProps = HtmlHTMLAttributes<HTMLButtonElement> & {
	noColor?: boolean;
};

export const ButtonText = component$<ButtonTextProps>(
	({ class: ClassName, noColor, ...props }) => {
		return (
			<button
				{...props}
				type="button"
				class={[
					//@ts-ignore
					{ "hover:text-pink text-black": !noColor },
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
