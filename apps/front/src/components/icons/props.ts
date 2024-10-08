import type {
	HtmlHTMLAttributes,
	QwikIntrinsicElements,
} from "@builder.io/qwik";
import type { LayoutSVGWithNamePros } from "./layoutSvgWithName";

export type SVGProps = HtmlHTMLAttributes<SVGElement> &
	QwikIntrinsicElements["svg"];
export type SVGWithNameProps = LayoutSVGWithNamePros & {
	name?: string;
	svgProps?: SVGProps;
};

export { LayoutSVGWithNamePros };
