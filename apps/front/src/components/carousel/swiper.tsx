import type {
	HtmlHTMLAttributes,
	NoSerialize,
	PropFunction,
	Signal,
} from "@builder.io/qwik";
import {
	_restProps,
	noSerialize,
	useId,
	useSignal,
	useStyles$,
	useVisibleTask$,
} from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

import Swiper from "swiper";
import type {
	AutoplayOptions,
	PaginationOptions,
	ZoomOptions,
} from "swiper/types";
import { type SwiperModule } from "swiper/types";

import {
	EffectFade,
	FreeMode,
	Navigation,
	Pagination,
	Thumbs,
	Virtual,
	Zoom,
} from "swiper/modules";
import { SVGCircleArrowLeft, SVGCircleArrowRight } from "../icons";
import NavigationCss from "./navigation.css?inline";
import PaginationCss from "./pagination.css?inline";
import SwiperCss from "./swiper.css?inline";

export { NavigationCss, PaginationCss, SwiperCss };

export interface SwiperProps extends HtmlHTMLAttributes<HTMLDivElement> {
	modules?: {
		navigation?: boolean;
		pagination?: boolean;
		thumbs?: boolean;
		zoom?: boolean;
		freeMode?: boolean;
		fadeEffect?: boolean;
		virtual?: boolean;
	};
	autoPlay?: boolean | AutoplayOptions;
	loop?: boolean;
	autoHeight?: boolean;
	zoom?: boolean | ZoomOptions;
	navigation?: boolean;
	onSwiper$?: PropFunction<(swiper: Signal<NoSerialize<Swiper>>) => void>;
	pagination?: boolean;
	slidesPerView?: number | "auto";
	spaceBetween?: string | number;
	speed?: number;
	centerArrows?: boolean;
	centeredSlides?: boolean;
	init?: boolean;
	breakpoints?: Record<string, SwiperProps>;
	thumbs?: {
		swiper?: NoSerialize<Swiper>;
		slideThumbActiveClass?: string;

		thumbsContainerClass?: string;

		multipleActiveThumbs?: boolean;

		autoScrollOffset?: number;
	};
	watchSlidesProgress?: boolean;
	relative?: boolean;
	freeMode?: boolean;
	effect?: string;
	allowTouchMove?: boolean;
	virtual?: boolean;
}

export const SwiperContainer = component$<SwiperProps>(
	({
		modules,
		autoPlay,
		pagination,
		navigation = undefined,
		loop,
		init = true,
		autoHeight,
		breakpoints,
		centeredSlides,
		onSwiper$,
		slidesPerView,
		spaceBetween,
		speed = 300,
		thumbs,
		zoom,
		freeMode,
		watchSlidesProgress,
		centerArrows = false,
		effect,
		allowTouchMove = true,
		virtual,
		...props
	}) => {
		useStyles$(SwiperCss);
		const ElementSig = useSignal<HTMLElement>();
		const id = useId();
		const swiper = useSignal<NoSerialize<Swiper>>();

		useVisibleTask$(() => {
			console.log("swiper");
		});

		useVisibleTask$(async ({ track }) => {
			track(() => [
				ElementSig.value,
				modules,
				autoPlay,
				pagination,
				navigation,
				loop,
				init,
				autoHeight,
				breakpoints,
				centeredSlides,
				slidesPerView,
				spaceBetween,
				speed,
				thumbs,
				zoom,
				freeMode,
				watchSlidesProgress,
				centerArrows,
			]);

			if (!ElementSig.value) return;
			const modulesVal = [] as SwiperModule[];
			if (modules?.pagination) modulesVal.push(Pagination);
			if (modules?.navigation) modulesVal.push(Navigation);
			if (modules?.zoom) modulesVal.push(Zoom);
			if (modules?.thumbs) modulesVal.push(Thumbs);
			if (modules?.freeMode) modulesVal.push(FreeMode);
			if (modules?.fadeEffect) modulesVal.push(EffectFade);
			if (modules?.virtual) modulesVal.push(Virtual);

			swiper.value = noSerialize(
				new Swiper(ElementSig.value, {
					modules: modulesVal as SwiperModule[],
					autoplay: autoPlay,
					navigation: {
						nextEl: `.button-next-${id}`,
						prevEl: `.button-prev-${id}`,
					},
					effect,

					pagination: pagination && {
						el: ".bottoms-pagination",
						clickable: true,
					},
					grid: {
						fill: "row",
						rows: 1,
					},
					allowTouchMove,
					virtual,
					loop,
					init,
					watchSlidesProgress,
					thumbs,
					autoHeight,
					freeMode,
					breakpoints: _restProps(breakpoints as any, ["modules"]),
					centeredSlides,
					slidesPerView,
					spaceBetween,
					speed,
					zoom,
				}),
			);

			console.log("swiper");

			onSwiper$?.(swiper);
		});

		return (
			<>
				<Relative relative={props.relative}>
					<div
						{...props}
						ref={ElementSig}
						class={[
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
						{navigation && (
							<NavigationComponent center={centerArrows} id={id} />
						)}

						{pagination && <PaginationComponent />}
					</div>
				</Relative>
			</>
		);
	},
);

const Relative = component$<{ relative?: boolean }>(({ relative = true }) => {
	if (!relative) return <Slot />;

	return (
		<span class="relative ">
			<Slot />
		</span>
	);
});

const NavigationComponent = component$<{ id: string; center: boolean }>(
	({ id, center }) => {
		useStyles$(NavigationCss);

		return (
			<>
				<SVGCircleArrowLeft
					class={[
						`button-prev-${id}`,
						{
							"top-1/3": !center,
							"top-1/2": center,
						},
						"absolute bottom-1/2 left-0 z-50 opacity-80 text-purple-400 hover:text-purple",
					]}
				/>

				<SVGCircleArrowRight
					class={[
						`button-next-${id}`,
						{
							"top-1/3": !center,
							"top-1/2": center,
						},
						"absolute bottom-1/2 right-0 z-50 opacity-90 text-purple-400 hover:text-purple",
					]}
				/>
			</>
		);
	},
);

const PaginationComponent = component$<PaginationOptions>(() => {
	useStyles$(PaginationCss);
	return (
		<div
			class={[
				"bottoms-pagination",
				"mt-5 w-full mx-auto flex items-center justify-center",
			]}
		/>
	);
});

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

export const Decorators = component$(() => <Slot />);

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
