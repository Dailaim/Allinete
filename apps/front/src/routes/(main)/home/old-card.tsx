import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface CardProps {
	title: string;
	link: string;

	description: string;
}

export const OldCard = component$<CardProps>(({ title, link }) => {
	return (
		<Link
			href={link}
			class="relative flex-grow flex h-[26rem]  flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
			onClick$={() => {
				console.log("clicked");
			}}
		>
			<span aria-hidden="true" class="absolute inset-0">
				<Slot name="image" />
			</span>
			<span
				aria-hidden="true"
				class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
			/>
			<span class="relative mt-auto text-center text-xl font-bold text-white">
				{title}
			</span>

			{/* <span
					class={"relative mt-auto text-center text-xl font-bold text-white"}
					ref={Element}
				>
					{description}
				</span> */}
		</Link>
	);
});

// export const CardSecondary = component$<CardProps>(
// 	({ title, link, description }) => {
// 		return (
// 			<Link href={link} class="relative overflow-hidden rounded-lg lg:h-96">
// 				<div class="absolute inset-0">
// 					<img
// 						src={image}
// 						alt={title}
// 						width="1000"
// 						height="1000"
// 						class="h-full w-full object-cover object-center"
// 					/>
// 				</div>
// 				<div aria-hidden="true" class="relative h-96 w-full lg:hidden" />
// 				<div aria-hidden="true" class="relative h-32 w-full lg:hidden" />
// 				<div class="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
// 					<div>
// 						<h2 class="text-xl font-bold text-white">{title}</h2>
// 						<p class="mt-1 text-sm text-gray-300">{description}</p>
// 					</div>
// 				</div>
// 			</Link>
// 		);
// 	},
// );
