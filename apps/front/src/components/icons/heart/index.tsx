import { component$ } from "@builder.io/qwik";
import { type SVGProps } from "../props";

export const SVGHeart = component$<
	SVGProps & {
		glitter?: boolean;
	}
>(({ glitter = false, ...props }) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="19"
			height="18"
			viewBox="0 0 19 18"
			fill="none"
			{...props}
		>
			<path
				d="M0.371865 8.59832C-0.701135 5.24832 0.552865 1.41932 4.06987 0.286322C5.91987 -0.310678 7.96187 0.0413219 9.49987 1.19832C10.9549 0.0733218 13.0719 -0.306678 14.9199 0.286322C18.4369 1.41932 19.6989 5.24832 18.6269 8.59832C16.9569 13.9083 9.49987 17.9983 9.49987 17.9983C9.49987 17.9983 2.09787 13.9703 0.371865 8.59832Z"
				fill="currentColor"
			/>

			<path
				hidden={!glitter}
				d="M13.5 3.69995C14.57 4.04595 15.326 5.00095 15.417 6.12195"
				stroke="white"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});

export const SVGHeartGlitter = component$<SVGProps>((props) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="19"
			height="18"
			viewBox="0 0 19 18"
			fill="none"
			{...props}
		>
			<path
				d="M0.371865 8.59832C-0.701135 5.24832 0.552865 1.41932 4.06987 0.286322C5.91987 -0.310678 7.96187 0.0413219 9.49987 1.19832C10.9549 0.0733218 13.0719 -0.306678 14.9199 0.286322C18.4369 1.41932 19.6989 5.24832 18.6269 8.59832C16.9569 13.9083 9.49987 17.9983 9.49987 17.9983C9.49987 17.9983 2.09787 13.9703 0.371865 8.59832Z"
				fill="currentColor"
			/>
			<path
				d="M13.5 3.69995C14.57 4.04595 15.326 5.00095 15.417 6.12195"
				stroke="white"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});
