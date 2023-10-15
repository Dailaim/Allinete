import type { HtmlHTMLAttributes } from "@builder.io/qwik";
import type { LayoutSVGWithNamePros } from "./layoutSvgWithName";

export type SVGProps = HtmlHTMLAttributes<SVGElement>;
export type SVGWithNameProps = LayoutSVGWithNamePros & {
	name: string;
	svgProps: SVGProps;
};

export { LayoutSVGWithNamePros };
