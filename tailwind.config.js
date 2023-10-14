/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	daisyui: {
		themes: ["valentine"],
	},
	theme: {
		extend: {
			fontFamily: {
				"press-start": ['"Press Start 2P"', "cursive"],
				merriweather: ["Merriweather", "serif"],
				mulish: ["Mulish", "sans-serif"],
			},
		},
	},
	plugins: [require("daisyui")],
};
