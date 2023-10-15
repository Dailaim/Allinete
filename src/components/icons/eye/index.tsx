import { component$ } from "@builder.io/qwik";
import type { SVGProps } from "../props";

export const SVGEyeOpen = component$<SVGProps>((props) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="17"
			viewBox="0 0 20 17"
			fill="none"
			{...props}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M13.1614 8.05305C13.1614 9.79905 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79905 6.83838 8.05305C6.83838 6.30605 8.25338 4.89105 9.99938 4.89105C11.7454 4.89105 13.1614 6.30605 13.1614 8.05305Z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05285C17.289 3.48885 13.806 0.750854 9.998 0.750854H10.002C6.194 0.750854 2.711 3.48885 0.75 8.05285C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});

export const SVGEyeClose = component$<SVGProps>((props) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="18"
			viewBox="0 0 20 18"
			fill="none"
			{...props}
		>
			<path
				d="M7.76045 11.3668C7.18545 10.7928 6.83545 10.0128 6.83545 9.13783C6.83545 7.38483 8.24745 5.97183 9.99945 5.97183C10.8664 5.97183 11.6644 6.32283 12.2294 6.89683"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M13.1049 9.69893C12.8729 10.9889 11.8569 12.0069 10.5679 12.2409"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M4.65451 14.4723C3.06751 13.2263 1.72351 11.4063 0.749512 9.13734C1.73351 6.85834 3.08651 5.02834 4.68351 3.77234C6.27051 2.51634 8.10151 1.83434 9.99951 1.83434C11.9085 1.83434 13.7385 2.52634 15.3355 3.79134"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M17.4473 5.99083C18.1353 6.90483 18.7403 7.95983 19.2493 9.13683C17.2823 13.6938 13.8063 16.4388 9.99929 16.4388C9.13629 16.4388 8.28529 16.2988 7.46729 16.0258"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M17.8868 1.24963L2.11279 17.0236"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
});

export const SVGEye = component$<
	SVGProps & {
		open?: boolean;
	}
>((props) => {
	return props.open ? <SVGEyeOpen {...props} /> : <SVGEyeClose {...props} />;
});
