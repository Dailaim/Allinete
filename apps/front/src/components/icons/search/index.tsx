import { component$ } from "@builder.io/qwik";
import { LayoutSVGWithName } from "../layoutSvgWithName";
import type { SVGWithNameProps } from "../props";
import SVGSearch from "./search.svg?component";

export { SVGSearch };

export const SVGSearchWithName = component$<SVGWithNameProps>(
	({ name = "Search", svgProps, ...props }) => {
		return (
			<LayoutSVGWithName {...props} name={name}>
				<SVGSearch {...svgProps} q:slot="icon" />
			</LayoutSVGWithName>
		);
	},
);
