import { component$ } from "@builder.io/qwik";

export const SVGArrowRight = component$((props) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="7"
			viewBox="0 0 12 7"
			fill="none"
			{...props}
		>
			<path
				d="M9.25 3.49998L1.25 3.49998"
				stroke="currentColor"
				stroke-width="1.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M7.88477 0.636858L10.76 3.49976L7.88477 6.36314"
				stroke="currentColor"
				stroke-width="1.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});
