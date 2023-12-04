// import type { NoSerialize, Signal } from "@builder.io/qwik";
// import {
// 	component$,
// 	useComputed$,
// 	useContext,
// 	useSignal,
// 	useStore,
// 	useVisibleTask$,
// } from "@builder.io/qwik";
// import type Swiper from "swiper";
// import { SwipeSlide, SwiperContainer } from "~/components/carousel/swiper";
// import { scrollContext } from "~/context/scroll";

// import { Motion } from "~/packages/motion";

// type Props = {
// 	product: string;
// 	links: string[];
// };

// export const Images = component$<Props>(({ links }) => {
// 	const swiper = useSignal<NoSerialize<Swiper>>();
// 	const thumbs2 = useSignal<NoSerialize<Swiper>>();
// 	const modal = useSignal(false);

// 	const scroll = useContext(scrollContext);

// 	useVisibleTask$(({ track }) => {
// 		track(() => modal.value);
// 		scroll.value = !modal.value;
// 		swiper.value?.update();
// 		swiper.value?.init();
// 	});

// 	const Signals = useStore<Record<number, Signal<HTMLElement>>>(() => {
// 		return links.reduce((acc, _, i) => {
// 			acc[i] = {
// 				value: null,
// 			};
// 			return acc;
// 		}, {});
// 	});

// 	const images = useComputed$(() => links.slice(0, 4));

// 	const delta = useComputed$(() => {
// 		if (!swiper.value) return false;
// 		if (!thumbs2.value) return false;

// 		thumbs2.value.init(thumbs2.value.el);
// 		thumbs2.value.update();

// 		return true;
// 	});

// 	return (
// 		<Motion.div
// 			initial={{
// 				opacity: 0,
// 				height: 0,
// 			}}
// 			animate={{
// 				opacity: 1,
// 				height: [0, "auto"],
// 			}}
// 			transition={{
// 				duration: 0.3,
// 				easing: "ease-in-out",
// 			}}
// 			class="max-w-[500px] flex mx-auto lg:mx-0 2xl:mx-auto flex-col px-5 lg:px-0"
// 		>
// 			<SwiperContainer
// 				loop={true}
// 				modules={{
// 					navigation: true,

// 					zoom: true,
// 				}}
// 				zoom
// 				navigation={!modal.value}
// 				centerArrows
// 				class="overflow-hidden"
// 				slidesPerView={"auto"}
// 				spaceBetween={1}
// 				speed={300}
// 				allowTouchMove={false}
// 				onSwiper$={(sp) => {
// 					swiper.value = sp.value;
// 				}}
// 			>
// 				{images.value.map((item, i) => {
// 					return (
// 						<Motion.div
// 							ref={Signals[i]}
// 							class="swiper-slide overflow-hidden"
// 							key={`${item}image-primary`}
// 							tabIndex={i}
// 							initial={{
// 								opacity: 0,
// 							}}
// 							inView={{
// 								opacity: 1,
// 							}}
// 							exit={{
// 								opacity: 0,
// 							}}
// 							transition={{
// 								delay: 0.1,
// 								duration: 0.3,
// 								easing: "ease-in-out",
// 							}}
// 						>
// 							<image
// 								class="w-full object-center flex aspect-square rounded-sm object-cover"
// 								width="578"
// 								height="579"
// 								src={item}
// 							/>
// 						</Motion.div>
// 					);
// 				})}
// 			</SwiperContainer>

// 			<SwiperContainer
// 				modules={{
// 					thumbs: true,
// 				}}
// 				class="overflow-hidden mt-2.5"
// 				relative={false}
// 				spaceBetween={10}
// 				slidesPerView={4}
// 				allowTouchMove={false}
// 			>
// 				{images.value.map((item, i) => {
// 					if (images.value.length - 1 === i && links.length > 4) {
// 						return (
// 							<SwipeSlide
// 								onClick$={() => {
// 									modal.value = true;
// 								}}
// 								key={`${item}image-secondary`}
// 							>
// 								<image
// 									class="w-full aspect-square object-cover object-center rounded"
// 									width="578"
// 									height="579"
// 									src={item}
// 								/>
// 								{/* ver mas  */}
// 								<span class="absolute inset-0 mx-auto w-full h-full right-0 z-10 flex items-center justify-center  text-white text-sm font-medium bg-gradient-to-t from-black to-transparent">
// 									Ver más
// 								</span>
// 							</SwipeSlide>
// 						);
// 					}

// 					return (
// 						<SwipeSlide
// 							onClick$={() => {
// 								if (images.value.length - 1 === i && links.length > 4) return;
// 								if (!swiper.value) return;

// 								const rapper = swiper.value.el.querySelector(".swiper-wrapper");

// 								// Encuentra el elemento en children que coincide con el atributo "tabIndex"
// 								const delta = Array.from(
// 									rapper?.children as any as HTMLElement[],
// 								).findIndex((children) => children === Signals[i].value);

// 								console.log("rapper", delta);

// 								// Asegúrate de que delta no sea undefined antes de llamar a slideTo
// 								if (delta !== -1) {
// 									swiper.value.slideTo(delta);
// 								}
// 							}}
// 							key={`${item}image-secondary`}
// 						>
// 							<image
// 								class="w-full object-center aspect-square rounded"
// 								width="80"
// 								height="80"
// 								src={item}
// 							/>
// 						</SwipeSlide>
// 					);
// 				})}
// 			</SwiperContainer>
// 		</Motion.div>
// 	);
// });

{
	/* 	<div
			class={[
				"fixed inset-0 z-50  items-center justify-center",
				{
					hidden: !modal.value,

					flex: modal.value,
				},
			]}
			onClick$={() => {
				delta;
				modal.value = false;
			}}
		>
			<div class="absolute inset-0 bg-black opacity-50" />
			<div class="max-w-[20vw] ">
				<SwiperContainer
					onClick$={(e) => {
						e.stopPropagation();
					}}
					loop={true}
					modules={{
						navigation: true,
					}}
					init={false}
					navigation
					centerArrows
					class="overflow-hidden"
					slidesPerView={"auto"}
					spaceBetween={1}
					speed={300}
					allowTouchMove={false}
				>
					{links.map((item, i) => {
						return (
							<Motion.div
								ref={Signals[i]}
								class="swiper-slide overflow-hidden"
								key={`${item}image-primary`}
								tabIndex={i}
								initial={{
									opacity: 0,
								}}
								inView={{
									opacity: 1,
								}}
								exit={{
									opacity: 0,
								}}
								transition={{
									delay: 0.1,
									duration: 0.3,
									easing: "ease-in-out",
								}}
							>
								<image
									class="w-full object-center flex aspect-square rounded-sm object-cover"
									width="578"
									height="579"
									src={item}
								/>
							</Motion.div>
						);
					})}
				</SwiperContainer>
			</div>
		</div> */
}
