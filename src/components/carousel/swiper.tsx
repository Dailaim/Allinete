/* import { readFileSync } from "fs"; */
import type { HtmlHTMLAttributes, NoSerialize, Signal } from "@builder.io/qwik";
import { Slot, component$, useVisibleTask$ } from "@builder.io/qwik";

import { Swiper } from "swiper";

import type { SwiperOptions as options } from "swiper/types";

import { Navigation, Pagination } from "swiper/modules";
import NavigationCss from "./navigation.css?inline";
import PaginationCss from "./pagination.css?inline";
import SwiperCss from "./swiper.css?inline";

export { NavigationCss, PaginationCss, SwiperCss };

export type SwiperOptions = NoSerialize<options>;

type SwiperProps = HtmlHTMLAttributes<HTMLDivElement> & {
	preFix?: string;
};

export const SwiperContainer = component$<SwiperProps>(
	({ preFix, ...props }) => {
		return (
			<>
				{/* <RegisterScript/> */}
				{/*@ts-ignore*/}
				<div
					{...props}
					class={[
						`${preFix ?? "Swiper"}`,
						"swiper-container",
						//@ts-ignore
						props.class,
					]}
				>
					<div class="swiper-wrapper">
						<Slot name="start" />
						<Slot />
						<Slot name="end" />
					</div>
					<Slot name="decorators" />
				</div>
			</>
		);
	},
);

export const SwipeSlide = component$<HtmlHTMLAttributes<HTMLDivElement>>(
	(props) => {
		return (
			//@ts-ignore
			<div {...props} class={["swiper-slide ", props.class]}>
				<Slot />
			</div>
		);
	},
);

// export const Slide = component$<SwiperSlide>((props) => {
// 	return (
// 		//@ts-ignore
// 		<swiper-slide {...props}>
// 			<Slot />
// 		</swiper-slide>
// 	);
// });

/* import {readFileSync} from "fs" */
// import {
// 	type SwiperContainer,
// 	type SwiperSlide,
// 	register,

// } from "swiper/element";

// export const Slide = component$<SwiperSlide>((props) => {
// 	return (
// 		//@ts-ignore
// 		<swiper-slide {...props}>
// 			<Slot />
// 		</swiper-slide>
// 	);
// });

// export const useSwipper = () => {
// 	useVisibleTask$(() => {
// 		register();
// 	});
// };

// type Conatiner =
// 	| HtmlHTMLAttributes<HTMLDivElement>
// 	| {
// 			ref?: Signal<SwiperContainer>;
// 	  };

// export const Carouse = component$<Conatiner>(({ ...props }) => {
// 	return (
// 		<>
// 			{/* <RegisterScript/> */}
// 			{/*@ts-ignore*/}
// 			<swiper-container {...props}>
// 				<Slot name="start" />
// 				<Slot />
// 				<Slot name="end" />
// 			</swiper-container>
// 		</>
// 	);
// });

/* const SwiperPage = component$(() => {
	const swiper = useSwiper();
	return (
		<div class="py-8 bg-neutral relative">
			<Slot />
			<div
				class="h-full absolute cursor-pointer top-0  z-50 w-1/2"
				onClick$={() => {
					swiper.slidePrev();
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
		</div>
	);
});
 */
