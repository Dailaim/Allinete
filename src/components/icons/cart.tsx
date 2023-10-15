import { component$ } from "@builder.io/qwik";
import { LayoutSVGWithName } from "./layoutSvgWithName";
import type { SVGProps, SVGWithNameProps } from "./props";

export const SVGCart = component$<SVGProps>(
	({ class: ClassName, ...props }) => {
		return (
			<svg
				role=""
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				{...props}
				class={[
					"w-6 h-6",
					//@ts-ignore
					ClassName,
				]}
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M16.5139 21.5H8.16604C5.09968 21.5 2.74727 20.3925 3.41547 15.9348L4.1935 9.8936C4.6054 7.66934 6.02416 6.81808 7.26901 6.81808H17.4475C18.7107 6.81808 20.047 7.73342 20.523 9.8936L21.3011 15.9348C21.8686 19.889 19.5802 21.5 16.5139 21.5Z"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16.6512 6.5984C16.6512 4.21233 14.7169 2.27804 12.3309 2.27804V2.27804C11.1819 2.27317 10.0782 2.7262 9.26406 3.53695C8.44987 4.34771 7.99218 5.44939 7.99219 6.5984H7.99219"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M15.2965 11.1018H15.2507"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M9.4659 11.1018H9.42013"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		);
	},
);

export const SVGCartWithName = component$<SVGWithNameProps>(
	({ name = "cart", svgProps, ...props }) => {
		return (
			<LayoutSVGWithName {...props} name={name}>
				<SVGCart {...svgProps} q:slot="icon" />
			</LayoutSVGWithName>
		);
	},
);
