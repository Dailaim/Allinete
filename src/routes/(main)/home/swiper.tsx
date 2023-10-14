import {
	component$,
	useSignal,
	useStyles$,
	useVisibleTask$,
} from "@builder.io/qwik";

import Carousel34 from "~/img/res/pexels-anderson-guerra-1115128.jpg?jsx";

import Carousel35 from "~/img/res/pexels-anderson-guerra-1115350.jpg?jsx";

import Carousel36 from "~/img/res/pexels-freestocksorg-457704.jpg?jsx";

import Carousel37 from "~/img/res/pexels-1749452.jpg?jsx";

import { type SwiperContainer } from "swiper/element/bundle";

import { register } from "swiper/element/bundle";

import SwiperCss from "swiper/swiper-bundle.css?inline";

export const Carouse = component$(() => {
	useStyles$(SwiperCss);

	const swiperSig = useSignal<SwiperContainer>();
	useVisibleTask$(() => {
		register();
		if (!swiperSig.value) return;

		const param: Partial<SwiperContainer> = {
			slidesPerView: 1.5,

			spaceBetween: 30,
			loop: true,
			centeredSlides: true,

			modules: [],
		};

		Object.assign(swiperSig.value, param);

		swiperSig.value.initialize();

		swiperSig.value.swiper.slideNext();

		swiperSig.value.swiper.isBeginning;
	});

	const carousel = [Carousel36, Carousel34, Carousel35, Carousel37];

	return (
		<section class="py-8 bg-neutral relative">
			<swiper-container class="" init="false" ref={swiperSig}>
				{carousel.map((Img, index) => (
					<swiper-slide class="" key={`item${index}`}>
						<Img
							alt=""
							class="object-center w-full object-cover h-[60vh] rounded-box"
						/>
					</swiper-slide>
				))}
				<div class="swiper-pagination" />
			</swiper-container>

			<div
				class="h-full absolute cursor-pointer top-0  z-50 w-1/2"
				onClick$={() => {
					swiperSig.value?.swiper.slidePrev();
				}}
			>
				<button
					type="button"
					class=" text-2xl glass absolute left-0 mx-14 top-1/2 bottom-1/2  btn btn-square"
				>
					{" "}
					❮
				</button>
			</div>

			<div
				class="h-full cursor-pointer absolute top-0 right-0 z-50 w-1/2"
				onClick$={() => {
					swiperSig.value?.swiper.slideNext();
				}}
			>
				<button
					type="button"
					class="  text-2xl glass absolute right-0 mx-14 top-1/2 bottom-1/2  btn btn-square"
				>
					{" "}
					❯
				</button>
			</div>
		</section>
	);
});
