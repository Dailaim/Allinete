import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
	// Control caching for this request for best performance and to reduce hosting costs:
	// https://qwik.builder.io/docs/caching/
	cacheControl({
		// Always serve a cached response by default, up to a week stale
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		// Max once every 5 seconds, revalidate on the server to get a fresh version of this page
		maxAge: 5,
	});
};

export default component$(() => {
	return (
		<>
			<Navbar />
			<Slot />
			<Footer />
		</>
	);
});




export const head: DocumentHead = {
	title: "Alinette - Tu Destino para la Belleza",
	meta: [
		{
			name: "description",
			content: "Descubre Alinette, tu tienda de maquillaje y productos de belleza de confianza. Ofrecemos los mejores productos para realzar tu belleza natural. Explora nuestra amplia selección de maquillaje, cuidado de la piel, cuidado del cabello y más, con un compromiso inquebrantable hacia la calidad y la satisfacción del cliente.",
		},
	],
};
