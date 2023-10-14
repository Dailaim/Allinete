import { Fragment, component$, useSignal } from "@builder.io/qwik";
import { InPlus } from "@qwikest/icons/iconoir";

export interface IndexProps {
	count: number;
}

// create function to calculate the off price
// round the number to 2 decimal places
function calcOff(price: number, off: number) {
	const discount = price - off;
	return Math.round((discount / price) * 100);
}

const filters = [
	{
		id: "color",
		name: "Color",
		options: [
			{ value: "white", label: "White" },
			{ value: "beige", label: "Beige" },
			{ value: "blue", label: "Blue" },
			{ value: "brown", label: "Brown" },
			{ value: "green", label: "Green" },
			{ value: "purple", label: "Purple" },
		],
	},
	{
		id: "category",
		name: "Category",
		options: [
			{ value: "new-arrivals", label: "All New Arrivals" },
			{ value: "tees", label: "Tees" },
			{ value: "crewnecks", label: "Crewnecks" },
			{ value: "sweatshirts", label: "Sweatshirts" },
			{ value: "pants-shorts", label: "Pants & Shorts" },
		],
	},
	{
		id: "sizes",
		name: "Sizes",
		options: [
			{ value: "xs", label: "XS" },
			{ value: "s", label: "S" },
			{ value: "m", label: "M" },
			{ value: "l", label: "L" },
			{ value: "xl", label: "XL" },
			{ value: "2xl", label: "2XL" },
		],
	},
];
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
		<main class="mx-auto  container px-3">
			<div class=" pt-10">
				<h1 class="text-4xl font-bold tracking-tight text-accent-content title">
					New Arrivals
				</h1>
				<p class="mt-4 text-base ">
					Checkout out the latest release of Basic Tees, new and improved with
					four openings!
				</p>
			</div>
			<div class="divider" />
			<div class="pb-24  lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
				<aside>
					<h2 class="sr-only">Filters</h2>

					<button
						type="button"
						class="inline-flex items-center lg:hidden"
						/* onClick$={() => setMobileFiltersOpen(true)} */
					>
						<span class="text-sm font-medium text-gray-700">Filters</span>
						<InPlus
							class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
							aria-hidden="true"
						/>
					</button>

					<div class="hidden lg:block sticky ">
						<form class="space-y-10  ">
							{filters.map((section) => (
								<Fragment key={section.name}>
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
															/* defaultValue={option.value} */
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
						</form>
					</div>
				</aside>

				<section
					aria-labelledby="product-heading"
					class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
				>
					<h2 id="product-heading" class="sr-only">
						Products
					</h2>

					<div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
						{products.map((product) => (
							<a href={product.href} key={product.id}>
								<div class="card glass shadow-xl h-full max-h-[34rem]">
									<figure>
										<img
											width="1280"
											height="1648"
											src={product.imageSrc}
											alt={product.imageAlt}
										/>
									</figure>
									<div class="card-body">
										{/* <h2 class="card-title">
											Shoes!
											<div class="badge badge-secondary">NEW</div>
										</h2>
										<p>If a dog chews shoes whose shoes does he choose?</p>
										<div class="card-actions justify-end">
											<div class="badge badge-outline badge-primary">
												Fashion
											</div>
											<div class="badge badge-primary badge-outline">
												Products
											</div>
										</div> */}
										<h2 class=" card-title line-clamp-1 text-neutral-focus">
											{product.name}
											<div class="ms-3 badge badge-secondary">NEW</div>
										</h2>
										<p class="line-clamp-2">{product.description}</p>
										<div class="flex flex-1 flex-col justify-end">
											<p class=" text-neutral ">{product.options}</p>

											<div class="flex items-end  justify-between">
												<span>
													{!product.off && <p class=" text-xs opacity-0">1 </p>}
													<p
														class={{
															"text-base-content": true,
															"line-through text-xs": product.off,
														}}
													>
														${product.price}
													</p>

													{product.off && (
														<p class="text-base text-base-content">
															${product.off}{" "}
															<span class="text-primary-focus mx-2">
																{calcOff(product.price, product.off)}% OFF
															</span>
														</p>
													)}
												</span>

												<div class="badge badge-outline mb-1 badge-primary mx-2">
													Fashion
												</div>
											</div>
										</div>
									</div>
								</div>
							</a>
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
