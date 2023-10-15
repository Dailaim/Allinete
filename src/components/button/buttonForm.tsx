import { type HtmlHTMLAttributes, Slot, component$ } from "@builder.io/qwik";

export type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement> & {
	glass?: boolean;
};

export const ButtonForm = component$<ButtonProps>(
	({ class: ClassName, ...props }) => {
		return (
			// biome-ignore lint/a11y/useButtonType: <explanation>
			<button
				{...props}
				class={[
					"rounded text-white bg-gray hover:bg-pink px-5 transition-all duration-200 ease-in-out",
					//@ts-ignore
					{
						"bg-opacity-90 hover:bg-opacity-100 ": props.glass,
					},
					//@ts-ignore
					ClassName,
				]}
			>
				<Slot />
			</button>
		);
	},
);
