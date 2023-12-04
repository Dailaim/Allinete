import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Images } from "./images";

const image = [
	"https://picsum.photos/578/579",
	"https://picsum.photos/578/580",
	"https://picsum.photos/578/581",
	"https://picsum.photos/578/582",
	"https://picsum.photos/578/585",
	"https://picsum.photos/578/584",
];

export default component$(() => {
	const loc = useLocation();

	console.log("loc", loc.params.product);

	return (
		<main class="mx-auto container">
			<h1>Shop</h1>

			<section class="lg:grid grid-cols-2 grid-rows-1">
				<Images links={image} />
			</section>
		</main>
	);
});
