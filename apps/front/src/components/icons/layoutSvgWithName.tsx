import { type HTMLAttributes, Slot, component$ } from "@builder.io/qwik";

export type LayoutSVGWithNamePros = HTMLAttributes<HTMLSpanElement> & {
	name?: string | undefined;
	row?: boolean;
	noTextSize?: boolean;
};

export const LayoutSVGWithName = component$<LayoutSVGWithNamePros>(
	({ name, class: ClassName, row, noTextSize, ...props }) => {
		return (
			<span
				{...props}
				class={[
					"uppercase inline-flex items-center  text-black hover:text-pink",
					"transition-all duration-200 ease-in-out",
					//@ts-ignore
					{
						"text-sm": !noTextSize,
						"flex-row": row,
						"flex-col": !row,
					},
					//@ts-ignore
					ClassName,
				]}
			>
				<Slot name="icon" />
				<Slot />
				<Slot name="name" />
				{name}
			</span>
		);
	},
);
