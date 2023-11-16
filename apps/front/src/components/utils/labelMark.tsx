import { type HtmlHTMLAttributes, Slot, component$ } from "@builder.io/qwik";

export type LabelMarkProps = HtmlHTMLAttributes<HTMLLabelElement>;

export const LabelMark = component$<LabelMarkProps>(
	({ class: className, ...props }) => {
		return (
			<label
				{...props}
				class={[
					"bg-pink px-5 py-1 rounded-r-full text-white capitalize text-sm font-medium",
					//@ts-ignore
					className,
				]}
			>
				<Slot />
			</label>
		);
	},
);
