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

	useVisibleTask$(
		() => {
			new Swiper(`.${id}`, {
				modules: [Pagination, Navigation],
				autoplay: true,
				loop: true,
				autoHeight: true,
				navigation: {
					nextEl: `.swiper-button-next-${id}`,
					prevEl: `.swiper-button-prev-${id}`,
				},

				pagination: {
					el: `.swiper-pagination-${id}`,
					clickable: true,
				},

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

					1400: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
				},
			});
		},
		{
			strategy: "document-ready",
		},
	);

	return (
		<SwiperContainer preFix={id} class="overflow-hidden relative">
			<Slot />

			<Decorators q:slot="decorators">
				<div class="absolute top-0 -right-4 z-10 w-12 blur h-full bg-off-white" />
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
	);
});

const Decorators = component$(() => <Slot />);
