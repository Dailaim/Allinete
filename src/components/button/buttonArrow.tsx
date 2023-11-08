import { Slot, component$ } from "@builder.io/qwik";
import { SVGArrowRight } from "../icons";
import type { ButtonTextProps } from "./buttonText";
import { ButtonText } from "./buttonText";

export type ButtonProps = ButtonTextProps;

export const ButtonArrow = component$<ButtonProps>(
	({ class: ClassName, ...props }) => {
		return (
			<ButtonText
				{...props}
				class={[
					" flex gap-1 text-center items-center py-[0.6rem]",
					//@ts-ignore
					ClassName,
				]}
			>
				<Slot />
				{/* TODO: Change icon ArrowRight to SVG in figma */}
				<SVGArrowRight />
			</ButtonText>
		);
	},
);
