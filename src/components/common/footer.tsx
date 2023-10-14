import { component$ } from "@builder.io/qwik";
import { SiInstagram } from "@qwikest/icons/simpleicons";
import { InstagramLink } from "~/utils/conts";

export const Footer = component$(() => {
	return (
		<section class="bg-neutral py-12">
			<footer class="footer gap-x-3 items-center py-4 px-3  md:text-2xl text-neutral-content mx-auto container">
				<a
					href={InstagramLink}
					target="_blank"
					rel="noopener noreferrer"
					class="items-center title grid-flow-col text text-4xl"
				>
					<p>Allinete</p>
				</a>
				{/* <nav class="grid-flow-col w-full justify-center flex md:place-self-center md:justify-self-end ">
					<a class="flex justify-end"></a>
				</nav> */}
			</footer>
		</section>
	);
});
