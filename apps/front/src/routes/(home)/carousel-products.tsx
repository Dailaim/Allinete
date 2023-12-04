import { Slot, component$ } from "@builder.io/qwik";

import { SwiperContainer } from "~/components/carousel/swiper";

export const CarouselProducts = component$(() => {
	const breakpoints = {
		300: {
			slidesPerView: 1.2,
			spaceBetween: 10,
		},
		390: {
			slidesPerView: 1.4,
			spaceBetween: 10,
		},
		450: {
			slidesPerView: 1.6,
			spaceBetween: 10,
		},
		550: {
			slidesPerView: 1.8,
			spaceBetween: 10,
		},
		640: {
			slidesPerView: 2.5,
			spaceBetween: 10,
		},

		900: {
			slidesPerView: 2.8,
			spaceBetween: 10,
		},

		1024: {
			slidesPerView: 3.2,
			spaceBetween: 10,
		},
		1250: {
			slidesPerView: 3.7,
			spaceBetween: 10,
		},

		1400: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
		1500: {
			slidesPerView: 4.6,
			spaceBetween: 10,
		},
	};

	return (
		<>
			<SwiperContainer
				modules={{
					navigation: true,
					pagination: true,
				}}
				breakpoints={breakpoints}
				speed={300}
				centeredSlides
				autoHeight
				loop
				autoPlay
				init
				pagination
				navigation
				class="overflow-x-hidden relative"
			>
				<Slot />
				<div
					q:slot="decorators"
					class="absolute top-0 -right-6 z-10 w-12 blur h-full bg-off-white"
				/>
				<div
					q:slot="decorators"
					class="absolute top-0 -left-6 z-10 w-12 blur h-full bg-off-white"
				/>
			</SwiperContainer>
		</>
	);
});
