import { type HTMLAttributes, Slot, component$ } from "@builder.io/qwik";

export type LayoutSVGWithNamePros = HTMLAttributes<HTMLSpanElement> & {
	name: string | undefined;
};

export const LayoutSVGWithName = component$<LayoutSVGWithNamePros>(
	({ name, class: ClassName, ...props }) => {
		return (
			<span
				{...props}
				class={[
					"uppercase inline-flex items-center flex-col text-xs text-black hover:text-pink",
					"transition-all duration-200 ease-in-out",
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
