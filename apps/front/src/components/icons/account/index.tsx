import { component$ } from "@builder.io/qwik";
import { LayoutSVGWithName } from "../layoutSvgWithName";
import type { SVGWithNameProps } from "../props";
import SVGAccount from "./account.svg?component";

export { SVGAccount };

export const SVGAccountWithName = component$<SVGWithNameProps>(
	({ name = "Account", svgProps, ...props }) => {
		return (
			<LayoutSVGWithName {...props} name={name}>
				<SVGAccount {...svgProps} q:slot="icon" />
			</LayoutSVGWithName>
		);
	},
);
