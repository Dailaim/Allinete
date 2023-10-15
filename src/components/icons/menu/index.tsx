import { Slot, component$ } from "@builder.io/qwik";
import { LayoutSVGWithName } from "../layoutSvgWithName";
import type { SVGWithNameProps } from "../props";
import SVGMenu from "./menu.svg?component";

export { SVGMenu };

export const SVGMenuWithName = component$<SVGWithNameProps>(
	({ name = "Menu", svgProps, ...props }) => {
		return (
			<LayoutSVGWithName {...props} name={name}>
				<SVGMenu {...svgProps} q:slot="icon" />
				<Slot name="name" />
			</LayoutSVGWithName>
		);
	},
);
