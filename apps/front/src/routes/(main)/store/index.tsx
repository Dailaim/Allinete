import { Fragment, component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Card } from "~/components/card/card";
import { InputCheck, InputRadio } from "~/components/inputCheck";

import {
	VerticalMenu,
	VerticalTap,
} from "~/components/vertical-tap/vertical-tap";

export interface IndexProps {
	count: number;
}

// create function to calculate the off price
// round the number to 2 decimal places
// function calcOff(price: number, off: number) {
// 	const discount = price - off;
// 	return Math.round((discount / price) * 100);
// }

// const filters = [
// 	{
// 		id: "color",
// 		name: "Color",
// 		options: [
// 			{ value: "white", label: "White" },
// 			{ value: "beige", label: "Beige" },
// 			{ value: "blue", label: "Blue" },
// 			{ value: "brown", label: "Brown" },
// 			{ value: "green", label: "Green" },
// 			{ value: "purple", label: "Purple" },
// 		],
// 	},
// 	{
// 		id: "category",
// 		name: "Category",
// 		options: [
// 			{ value: "new-arrivals", label: "All New Arrivals" },
// 			{ value: "tees", label: "Tees" },
// 			{ value: "crewnecks", label: "Crewnecks" },
// 			{ value: "sweatshirts", label: "Sweatshirts" },
// 			{ value: "pants-shorts", label: "Pants & Shorts" },
// 		],
// 	},
// 	{
// 		id: "sizes",
// 		name: "Sizes",
// 		options: [
// 			{ value: "xs", label: "XS" },
// 			{ value: "s", label: "S" },
// 			{ value: "m", label: "M" },
// 			{ value: "l", label: "L" },
// 			{ value: "xl", label: "XL" },
// 			{ value: "2xl", label: "2XL" },
// 		],
// 	},
// ];
const products = [
	{
		id: 2,
		name: "Basic Tee31231231312",
		href: "#",
		price: 32,
		description:
			"Look like a visionary CEO and wear the same black t-shirt every day.",
		options: "Black",
		imageSrc: "/pexels-valeria-boltneva-90297.jpg",
		imageAlt: "Front of plain black t-shirt.",
	},
	{
		id: 1,
		name: "Basic Tee 8-Pack",
		href: "#",
		price: 256,
		description:
			"Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
		options: "8 colors",
		imageSrc: "/pexels-ron-lach-8128066.jpg",
		imageAlt:
			"Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
	},
	{
		id: 2,
		name: "Basic Tee",
		href: "#",
		price: 32,
		description:
			"Look like a visionary CEO and wear the same black t-shirt every day.",
		options: "Black",
		imageSrc: "/pexels-valeria-boltneva-90297.jpg",
		imageAlt: "Front of plain black t-shirt.",
	},
	{
		id: 1,
		name: "Basic Tee 8-Pack",
		href: "#",
		price: 256,
		description:
			"Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
		options: "8 colors",
		imageSrc: "/pexels-ron-lach-8128066.jpg",
		imageAlt:
			"Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
	},
	{
		id: 2,
		name: "Basic Tee",
		href: "#",
		price: 32,
		description:
			"Look like a visionary CEO and wear the same black t-shirt every day.",
		options: "Black",
		imageSrc: "/pexels-valeria-boltneva-90297.jpg",
		imageAlt: "Front of plain black t-shirt.",
	},
	{
		id: 1,
		name: "Basic Tee 8-Pack",
		href: "#",
		price: 256,
		description:
			"Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
		options: "8 colors",
		imageSrc: "/pexels-ron-lach-8128066.jpg",
		imageAlt:
			"Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
	},
	{
		id: 2,
		name: "Basic Tee",
		href: "#",
		price: 32,
		description:
			"Look like a visionary CEO and wear the same black t-shirt every day.",
		options: "Black",
		imageSrc: "/pexels-valeria-boltneva-90297.jpg",
		imageAlt: "Front of plain black t-shirt.",
	},
	{
		id: 1,
		name: "Basic Tee 8-Pack",
		href: "#",
		off: 246,
		price: 256,
		description:
			"Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
		options: "8 colors",
		imageSrc: "/pexels-ron-lach-8128066.jpg",
		imageAlt:
			"Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
	},

	// More products...
];

export default component$(() => {
	return (
		<main class="mx-auto  container px-3 lg:pt-10">
			<div class="divider" />
			<div class="pb-24  lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
				<aside>
					<h2 class="sr-only">Filters</h2>

					<div class="hidden lg:block">
						<div>
{/* 							<div class="bg-white rounded shadow-sm px-5 pt-2.5 pb-8 flex flex-col gap-5 text-blue-gray">
								<h2 class="text-black text-2xl font-semibold">
									Double-Cleanse
								</h2>
								<p>Cleansing Balms</p>
								<p>Oil Cleansers</p>
								<p>Water Cleansers</p>
							</div> */}

							<div class="bg-white rounded shadow-sm px-5 pt-2.5 pb-8 mt-4 flex flex-col gap-5 text-blue-gray">
								<h2 class="text-black text-2xl font-semibold">Filters</h2>
								<VerticalMenu class="divide-y divide-gray text-sm">
									<VerticalTap title="Product Type">
										<InputCheck label="Cleanser" />
										<InputCheck label="Toner" />
										<InputCheck label="Serum" />
										<InputCheck label="Moisturizer" />
									</VerticalTap>
									<VerticalTap title="Ingredient Type">
										<InputCheck label="Cleanser" />
										<InputCheck label="Toner" />
										<InputCheck label="Serum" />
									</VerticalTap>
									<VerticalTap title="skin type" defaultOpen>
										<InputCheck label="Cleanser" />
										<InputCheck label="Toner" />
										<InputCheck label="Serum" />
									</VerticalTap>
									<VerticalTap title="price range" defaultOpen>
										<InputRadio name="price" label="Under $25" />
										<InputRadio name="price" label="$25 - $50" />
										<InputRadio name="price" label="$50 - $100" />

										{/* <InputRadio
											name="price"
											label=""
											render={
												<div class="flex  items-center pb-5 gap-2.5">
													<Input label="$ Min" class="w-4/5" />
													<Input label="$ Max" class="w-4/5" />
												</div>
											}
										/> */}
									</VerticalTap>
								</VerticalMenu>
								<Button variant="secondary">Apply</Button>
							</div>
						</div>
						{/* <form class="space-y-10  ">
							{filters.map((section, index) => (
								<Fragment key={section.name + index}>
									<div>
										<fieldset>
											<legend class="block font-medium text-neutral title text-2xl">
												{section.name}
											</legend>
											<div class="space-y-3 pt-6">
												{section.options.map((option, optionIdx) => (
													<div key={option.value} class="flex items-center">
														<input
															id={`${section.id}-${optionIdx}`}
															name={`${section.id}[]`}
															///* defaultValue={option.value} * /
															value={option.value}
															type="checkbox"
															class="h-4 w-4 rounded checkbox checkbox-primary checkbox-lg"
														/>
														<label
															for={`${section.id}-${optionIdx}`}
															class="ml-3 text-lg select-none cursor-pointer "
														>
															{option.label}
														</label>
													</div>
												))}
											</div>
										</fieldset>
									</div>
									<div class="divider" />
								</Fragment>
							))}
						</form> */}
					</div>
				</aside>

				<section
					aria-labelledby="product-heading"
					class=" lg:col-span-2 lg:mt-0 xl:col-span-3"
				>
					<div class="uppercase text-purple hidden lg:flex justify-between lg:mb-6">
						<h4 class="">46 product</h4>

						<div class="flex gap-2">
							<h4>sort by</h4>

							<select class="text-black text-sm rounded pe-8 ps-4 py-0 border-0 bg-white appearance-none  shadow-sm ring-1 ring-inset ring-white/30 placeholder:text-purple focus:ring-2 focus:ring-inset focus:ring-pink  form-select">
								<option value="featured">Featured</option>
								<option value="price">Price: Low to High</option>
								<option value="price-desc">Price: High to Low</option>
							</select>
						</div>
					</div>

					<div class="grid grid-cols-1 pt-10 lg-pt-0 justify-items-center gap-5 xs:grid-cols-2  md:grid-cols-3  2xl:grid-cols-4">
						{products.map((_, index) => (
							<Fragment key={`${index}articulo card`}>
								<Card
									class="w-auto max-w-xs shadow-sm"
									name="All-Around Safe Block Essence Sun SPF45+"
									description="All Around Safe Block Sun Milk SPF50+/PA+++"
									image="https://cdn.builder.io/api/v1/image/assets/TEMP/f2594f36-3e5a-4ae9-9521-e00524c7e7a4?apiKey=2abb4ac878e0419aae6d537936d6d30b&width=800"
								/>
							</Fragment>
						))}
					</div>
				</section>
			</div>
		</main>
	);
});

{
	/* <div
								key={product.id}
								class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
							>
								<div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
									<img
										width="1280"
										height="1648"
										src={product.imageSrc}
										alt={product.imageAlt}
										class="h-full w-full object-cover object-center sm:h-full sm:w-full"
									/>
								</div>
								<div class="flex flex-1 flex-col space-y-2 p-4">
									<h3 class="text-sm font-medium text-gray-900">
										<a href={product.href}>
											<span aria-hidden="true" class="absolute inset-0" />
											{product.name}
										</a>
									</h3>
									<p class="text-sm text-gray-500">{product.description}</p>
									<div class="flex flex-1 flex-col justify-end">
										<p class="text-sm italic text-gray-500">
											{product.options}
										</p>
										<p class="text-base font-medium text-gray-900">
											{product.price}
										</p>
									</div>
								</div>
							</div> */
}
