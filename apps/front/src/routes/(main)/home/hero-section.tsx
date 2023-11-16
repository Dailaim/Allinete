import { component$ } from "@builder.io/qwik";

import { Button } from "~/components/button";
import Image from "./presentacion.jpeg?jsx";

export const HeroSection = component$(() => {
	return (
		<section class="relative h-[370px] overflow-hidden bg-[#F5E0E5] md:h-[460px]">
			<div class="absolute -right-3/4  top-0  h-full overflow-hidden  sm:-right-1/2 md:right-0 ">
				<Image class="  h-full overflow-hidden object-cover object-center" />
			</div>
			<div class=" flex overflow-hidden h-full bg-cover bg-center  text-black  ">
				<div class=" container z-10 mx-auto my-16 lg:my-28 grid gap-7 px-11     ">
					<h1 class="max-w-[17rem] sm:max-w-sm text-2xl   font-bold sm:text-3xl md:max-w-lg md:text-5xl lg:max-w-xl xl:max-w-2xl">
						Discover your inner beauty with Blossom Glow Kit
					</h1>
					<h2
						class="text-lg
            md:text-2xl
          "
					>
						Great gift for yourself and loved ones
					</h2>
					<div class="">
						<Button
							variant="primary"
							isLink
							href="/store"
							class="w-1/3 min-w-[10rem] max-w-xs  items-center justify-center "
						>
							Shop Now
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
});
