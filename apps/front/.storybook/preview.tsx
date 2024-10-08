import { Parameters } from "storybook-framework-qwik";
import "../src/global.css";

export const parameters: Parameters = {
	a11y: {
		config: {},
		options: {
			checks: { "color-contrast": { options: { noScroll: true } } },
			restoreScroll: true,
		},
	},
	options: {
		showRoots: true,
	},
	docs: {
		story: {
			iframeHeight: "200px",
			class: "bg-off-white",
		},
	},
};
