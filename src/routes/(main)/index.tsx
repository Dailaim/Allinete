import {
	Fragment,
	component$,
	useSignal,
	useVisibleTask$,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { register } from "swiper/element";
import { Footer } from "~/components/common/footer";
import { Navbar } from "~/components/common/navbar";
import { LeafletMap } from "~/components/leaflet-map";
import Section32 from "~/img/res/pexels-freestocksorg-318379.jpg?jsx";
import Section31 from "~/img/res/pexels-kaboompics-com-6161.jpg?jsx";
import Section33 from "~/img/res/pexels-rdne-stock-project-6724412.jpg?jsx";
import { Card } from "~/routes/(main)/home/card";
import { Presentation } from "~/routes/(main)/home/presentation";
import { Carouse } from "~/routes/(main)/home/swiper";

import Card1 from "~/img/res/pexels-rdne-stock-project-6724402.jpg?jsx";

import Card2 from "~/img/res/pexels-cottonbro-studio-4620852.jpg?jsx";

import Card3 from "~/img/res/makeup-3081015.jpg?jsx";

import type { LocationsProps } from "~/models/location";
import { useAuthSession } from "../plugin@auth";

const cards = [
	{
		Image: Card1,
		title: "Healthy Skin Solutions",
		description:
			"Revitalize your skin with our range of nourishing skincare treatments.",
	},
	{
		Image: Card2,
		title: "Flawless Makeup Application",
		description:
			"Enhance your beauty with our professional makeup services for any occasion.",
	},
	{
		Image: Card3,
		title: "Perfect Packages",
		description:
			"Look stunning on your special day with our customized bridal packages.",
	},
];

const services = [
	{
		title: "Beauty consultations",
		description: "Expert advice tailored to your unique needs.",
		Image: Section31,
	},
	{
		title: "Glamour makeup tutorials",
		description: "Learn the art of stunning makeup application.",
		Image: Section32,
	},
	{
		title: "Express facials",
		description: "Experience a quick and refreshing skincare treatment.",
		Image: Section33,
	},
];

export default component$(() => {
	const data = useAuthSession();

	useVisibleTask$(() => {
		register();
		console.log("data", data.value);
	});

	const currentLocation = useSignal<LocationsProps>({
		name: "Soraluze",
		point: [43.17478, -2.41172],
		/**
		 * Define rectangle with: Southwest lat, South West Lng, North East lat,  North East lng points.
		 * Very interesting when use to filter in OpenStreetMap API to take POIs
		 * Example: https://qwik-osm-poc.netlify.app/
		 */
		boundaryBox:
			"43.14658914559456,-2.4765586853027344,43.202923523094725,-2.3467826843261723",
		zoom: 9,
		marker: false,
	});
	return (
		<>
			<Presentation />
			<section class="bg-neutral-200">
				<div class="container mx-auto py-10 px-3">
					<h2 class="text-4xl font-bold title text-black mb-6">
						Core Packages
					</h2>

					<div class="flex flex-wrap basis-52 justify-center gap-7 ">
						{cards.map(({ title, description, Image }) => (
							<Fragment key={title}>
								<Card title={title} description={description} link="/">
									<Image
										alt={title}
										class="h-full w-full object-cover object-center "
										q:slot="image"
									/>
								</Card>
							</Fragment>
						))}
					</div>
				</div>
			</section>

			<section class="container mx-auto py-10 px-3 my-10">
				<h1 class="text-4xl font-bold title text-center mb-6">
					Additional services
				</h1>
				<div>
					<div class="mx-auto mt-20 flex flex-wrap  max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{services.map((Service) => (
							<div class="flex-grow lg:w-3/12" key={Service.title}>
								<Service.Image
									class="aspect-[3/2] w-full rounded-2xl object-cover"
									alt=""
								/>
								<h3 class="mt-6 text-3xl mb-3 text-center title font-semibold leading-8 tracking-tight ">
									{Service.title}
								</h3>
								<p class="text-base text-center leading-7 text-gray-600">
									{Service.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section class="container mx-auto px-3 py-24">
				<h2 class="text-3xl font-bold title text-center mb-6">
					Thank you, Alinette, for your exceptional makeup and skincare
					products. Your attention to detail and quality ingredients have
					transformed my beauty routine. I feel confident and radiant every day.
					Keep up the amazing work!
				</h2>
				<p class="text-center">- Jane Doe</p>
			</section>
			<Carouse />

			{/* <section class="">
				<LeafletMap class="w-full h-[35rem]" location={currentLocation} />;
			</section> */}
		</>
	);
});

export const head: DocumentHead = {
	title: "Welcome to Qwik",
	meta: [
		{
			name: "description",
			content: "Qwik site description",
		},
	],
};
