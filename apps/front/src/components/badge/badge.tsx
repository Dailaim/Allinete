import { type HTMLAttributes, Slot, component$ } from "@builder.io/qwik";

export type BadgeProps = HTMLAttributes<HTMLDivElement>;

export const Badge = component$<BadgeProps>(
	({ class: ClassName, ...props }) => {
		return (
			<div
				{...props}
				class={[
					" inline  hover:bg-opacity-50 bg-gray bg-opacity-80 px-2.5 py-0.5 rounded-full text-xs hover:bg-pink text-black",
					//@ts-ignore
					ClassName,
				]}
			>
				# <Slot />
			</div>
		);
	},
);
