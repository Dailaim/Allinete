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
				poppins: ["Poppins", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},
			screens: {
				xs: "360px",
			},

			colors: {
				"blue-gray": "#697586",
				gray: "#dfe1e3",
				"off-white": "#f9fafc",
				purple: { DEFAULT: "#b0a6bd", 400: "#dfdbe5", 200: "#efedf2" },
				pink: {
					DEFAULT: "#f5a3b7",
					light: "#fee2e3",
					300: "#fff7f7",
				},
				green: {
					DEFAULT: "#7fccc6",
					100: "#f3fafa",
				},
				red: {
					DEFAULT: "#e77373",
					100: "#fdf1f1",
				},
				orange: {
					DEFAULT: "#fdb64e",
					100: "#fff8ee",
				},
			},
		},
	},
	plugins: [
		/* require("daisyui") */
		require("@tailwindcss/forms"),
	],
};
