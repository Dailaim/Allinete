import {
	Slot,
	component$,
	useId,
	useStyles$,
	useVisibleTask$,
} from "@builder.io/qwik";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import {
	PaginationCss,
	SwiperContainer,
	SwiperCss,
} from "~/components/carousel/swiper";
import { SVGCircleArrowLeft, SVGCircleArrowRight } from "~/components/icons";

export const CarouselProducts = component$(() => {
	useStyles$(SwiperCss);
	useStyles$(PaginationCss);
	const id = useId();

	useVisibleTask$(() => {
		new Swiper(`.${id}`, {
			modules: [Pagination, Navigation],
			autoplay: true,
			loop: true,

			autoHeight: true,
			navigation: {
				nextEl: `.swiper-button-next-${id}`,
				prevEl: `.swiper-button-prev-${id}`,
			},
			centeredSlides: true,
			pagination: {
				el: `.swiper-pagination-${id}`,
				clickable: true,
			},
			speed: 300,
			breakpoints: {
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
			},
		});
	});

	return (
		<span class="relative">
			<div class="absolute top-0 -right-6 z-10 w-12 blur h-full bg-off-white" />
			<div class="absolute top-0 -left-6 z-10 w-12 blur h-full bg-off-white" />
			<SwiperContainer preFix={id} class="overflow-hidden relative">
				<Slot />

				<Decorators q:slot="decorators">
					<SVGCircleArrowLeft
						class={[
							`swiper-button-prev-${id}`,
							"absolute top-1/3 bottom-1/2 left-0 z-40 opacity-80 text-purple-400 hover:text-purple",
						]}
					/>

					<SVGCircleArrowRight
						class={[
							`swiper-button-next-${id}`,
							"absolute top-1/3 bottom-1/2 right-0 z-40 opacity-90 text-purple-400 hover:text-purple",
						]}
					/>

					<div
						class={[
							`swiper-pagination-${id}`,
							"mt-5 w-full mx-auto flex items-center justify-center",
						]}
					/>
				</Decorators>
			</SwiperContainer>
		</span>
	);
});

const Decorators = component$(() => <Slot />);
