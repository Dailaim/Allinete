import { component$ } from "@builder.io/qwik";
import type { SVGProps } from "./props";

export const SVGDangerCircle = component$<SVGProps>((props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			{...props}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M10.0003 2.29175C14.257 2.29175 17.7087 5.74258 17.7087 10.0001C17.7087 14.2567 14.257 17.7084 10.0003 17.7084C5.74283 17.7084 2.29199 14.2567 2.29199 10.0001C2.29199 5.74258 5.74283 2.29175 10.0003 2.29175Z"
				stroke="currentColor"
				stroke-width="1.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M9.99626 6.83685V10.5194"
				stroke="currentColor"
				stroke-width="1.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M9.996 13.1634H10.0043"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});
