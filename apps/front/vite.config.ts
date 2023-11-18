import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import svgx from "@svgx/vite-plugin-qwik";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
	return {
		plugins: [qwikCity(), qwikVite(), tsconfigPaths(), svgx()],
		preview: {
			headers: {
				"Cache-Control": "public, max-age=600",
			},
		},
		optimizeDeps: { include: ["@auth/core"] },

	};
  
});
