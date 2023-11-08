import {
	Fragment,
	Slot,
	component$,
	useSignal,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik";
import { type DocumentHead, server$ } from "@builder.io/qwik-city";
import { SwipeSlide } from "~/components/carousel/swiper";
import Section32 from "~/img/res/pexels-freestocksorg-318379.jpg?jsx";
import Section31 from "~/img/res/pexels-kaboompics-com-6161.jpg?jsx";
import Section33 from "~/img/res/pexels-rdne-stock-project-6724412.jpg?jsx";
/* import { Card } from "~/routes/(main)/home/card"; */

import Card1 from "~/img/res/pexels-rdne-stock-project-6724402.jpg?jsx";

import Card2 from "~/img/res/pexels-cottonbro-studio-4620852.jpg?jsx";

import Card3 from "~/img/res/makeup-3081015.jpg?jsx";

import Carousel35 from "~/img/res/pexels-anderson-guerra-1115350.jpg?jsx";

import Carousel36 from "~/img/res/pexels-freestocksorg-457704.jpg?jsx";

import Carousel37 from "~/img/res/pexels-1749452.jpg?jsx";

import { Card } from "~/components/card/card";

import { SiInstagram } from "@qwikest/icons/simpleicons";
import { Button, ButtonForm } from "~/components/button";
import { Topic } from "~/components/topic/topic";
import type { LocationsProps } from "~/models/location";
import { useAuthSession } from "~/routes/plugin@auth";
import { CarouselProducts } from "./home/carousel-products";
import { HeroSection } from "./home/hero-section";

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

const images = [Carousel35, Carousel36, Carousel37];

/* const Layout = component$<{} & {}>(({ ...props }) => {
	return (
		<Carouse>
			{images.map((Image, index) => (
				<SwipeSlide key={index + 23131231}>
					<Image />
				</SwipeSlide>
			))}
		</Carouse>
	);
}); */

export default component$(() => {
	//useSwipper();
	const data = useAuthSession();

	useVisibleTask$(() => {
		/* register(); */
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
			<HeroSection />

			<main class="flex flex-col gap-16 mt-16 lg:gap-20 lg:mt-20">
				<section class="container mx-auto  px-6 2xl:px-0">
					<Topic title="New Arrivals" subTitle="see all" class="mb-7" />
					<CarouselProducts>
						{[1, 2, 3, 4, 5, 5, 6, 6, 6, 6].map((_, index) => (
							<SwipeSlide key={`Card-${index}-1`}>
								<Card
									class="w-auto max-w-xs "
									name="All-Around Safe Block Essence Sun SPF45+"
									description="All Around Safe Block Sun Milk SPF50+/PA+++"
									image="https://cdn.builder.io/api/v1/image/assets/TEMP/f2594f36-3e5a-4ae9-9521-e00524c7e7a4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=800"
								/>
							</SwipeSlide>
						))}
					</CarouselProducts>
				</section>

				<section class="container mx-auto  px-6 2xl:px-0">
					<Topic title="New Arrivals" subTitle="see all" class="mb-7" />

					<CarouselProducts>
						{[1, 2, 3, 4, 5, 5, 6, 6, 6, 6].map((_, index) => (
							<SwipeSlide key={`Card-${index}-2`}>
								<Card
									class="w-auto max-w-xs "
									name="All-Around Safe Block Essence Sun SPF45+"
									description="All Around Safe Block Sun Milk SPF50+/PA+++"
									image="https://cdn.builder.io/api/v1/image/assets/TEMP/f2594f36-3e5a-4ae9-9521-e00524c7e7a4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=800"
								/>
							</SwipeSlide>
						))}
					</CarouselProducts>
				</section>

				<section>
					<div class="flex flex-col">
						<div class="bg-pink-300  self-stretch flex w-full flex-col  pt-8 px-5 max-md:max-w-full">
							<div class="self-center z-[1] ml-0 mb-0 w-[863px] max-w-full max-md:mb-2.5">
								<div class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
									<div class="flex flex-col items-stretch justify-center w-[48%] max-md:w-full max-md:ml-0">
										<div class="flex-col  justify-center relative flex grow mt-2 pr-5 pb-6 max-md:mt-6">
											<img
												alt=""
												width="614"
												height="644"
												loading="lazy"
												srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0d6bd4bf-ef6e-4d9d-9a5e-323b3df097d4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d6bd4bf-ef6e-4d9d-9a5e-323b3df097d4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d6bd4bf-ef6e-4d9d-9a5e-323b3df097d4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d6bd4bf-ef6e-4d9d-9a5e-323b3df097d4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d6bd4bf-ef6e-4d9d-9a5e-323b3df097d4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d6bd4bf-ef6e-4d9d-9a5e-323b3df097d4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d6bd4bf-ef6e-4d9d-9a5e-323b3df097d4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0d6bd4bf-ef6e-4d9d-9a5e-323b3df097d4?apiKey=2abb4ac878e0419aae6d537936d6d30b&"
												class="absolute z-[-1] h-full w-full object-cover object-center inset-0"
											/>
											<img
												alt=""
												width="614"
												height="644"
												loading="lazy"
												srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f79aa6a4-1ff8-4f5e-b4a6-5758b361f82c?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f79aa6a4-1ff8-4f5e-b4a6-5758b361f82c?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f79aa6a4-1ff8-4f5e-b4a6-5758b361f82c?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f79aa6a4-1ff8-4f5e-b4a6-5758b361f82c?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f79aa6a4-1ff8-4f5e-b4a6-5758b361f82c?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f79aa6a4-1ff8-4f5e-b4a6-5758b361f82c?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f79aa6a4-1ff8-4f5e-b4a6-5758b361f82c?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f79aa6a4-1ff8-4f5e-b4a6-5758b361f82c?apiKey=2abb4ac878e0419aae6d537936d6d30b&"
												class=" object-cover object-center w-[307px]  z-[1] mt-0 max-w-full "
											/>
										</div>
									</div>
									<div class="flex w-full justify-center">
										<div class="flex flex-col items-stretch max-w-sm justify-center w-full  gap-3  ">
											<h4 class="font-bold text-4xl">The Skin Quiz</h4>
											<p class="font-montserrat text-base sm:text-lg text-blue-gray max-w-md">
												Meet the quiz that will curate a routine just just just
												as unique as you are.
											</p>
											<Button
												class="sm:w-auto lg:mr-11 w-full"
												variant="primary"
											>
												Explore more
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section class="container mx-auto px-6 2xl:px-0 mb-10">
					<Topic
						subTitle="see all"
						titleClass="max-w-min sm:max-w-max"
						class="mb-7"
					>
						<span q:slot="title">
							Share how you blossomed with{" "}
							<span class="text-pink">#Alinette</span>
						</span>
					</Topic>
					<div class="grid  grid-cols-2  lg:grid-cols-4 lg:grid-rows-2 gap-5">
						{[1, 2, 3, 4, 3, 4, 5, 5].map((_, index) => (
							<span class="w-full h-full relative" key={`${index}image`}>
								<div class="absolute w-full h-full justify-center p-5 inset-0 items-center bg-white/30 backdrop-blur-[2px] gap-3 opacity-0  flex hover:opacity-100 flex-col">
									<ButtonForm class="w-full max-w-[12rem] p-2.5 flex items-center justify-center gap-1">
										See in <SiInstagram />
									</ButtonForm>

									<ButtonForm class="w-full max-w-[12rem] p-2.5">
										Byu now
									</ButtonForm>
								</div>
								<img
									alt={"fadfasd"}
									src={
										"https://cdn.builder.io/api/v1/image/assets/TEMP/f2594f36-3e5a-4ae9-9521-e00524c7e7a4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=800"
									}
									class="aspect-square object-cover object-center w-full overflow-hidden self-stretch"
								/>
							</span>
						))}
					</div>
				</section>
			</main>
		</>
	);
});

export const FragmentSlot = component$(() => {
	return <Slot />;
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
