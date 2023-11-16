import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Presentacion from "~/img/presentacion.jpeg?jsx";

export const Presentation = component$(() => {
	return (
		<>
			<section
				class="relative "
				style={{
					minHeight: "calc(54px)",
				}}
			>
				<div class="absolute overflow-hidden w-full h-full ">
					<Presentacion class="w-screen object-cover h-full object-center" />
				</div>
				<div class=" text-black flex bg-cover bg-center items-center justify-center overflow-hidden flex-none ">
					<div class="w-full h-full bg-white absolute opacity-70 " />
					<div class="py-16 md:px-0 px-3 container  max-w-lg  2xl:max-w-xl gap-4 mx-auto grid my-14 justify-center items-center  z-10 text-center  ">
						<h1 class="text-4xl  md:text-5xl title ">Enhance Your Beauty</h1>
						<h2 class="text-lg">
							Discover the perfect makeup and skincare products to enhance your
							natural beauty and radiance.
						</h2>

						<Link href="/store" class="md:mx-auto btn btn-neutral">
							Shop Now
						</Link>
					</div>
				</div>
			</section>
		</>
	);
});
