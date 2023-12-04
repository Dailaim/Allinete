import { component$, useContextProvider, useStore } from "@builder.io/qwik";

import { RatingStar } from "~/components/utils";
import { AdditionalDetails } from "./additional-details";
import { ImageGallery } from "./image-gallery";

import { marked } from "marked";

import { $ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { productContext } from "./context-id-product";
import { product } from "./domy";
import { FormToBag } from "./form-to-bag";
import type { Product } from "./types";

export const useGetProduct = routeLoader$((e) => {
	e.params.product;

	// TODO: Get product from backend

	return product;
});

export default component$(() => {
	const productDefault = useGetProduct();

	const product = useStore<Product>(() => productDefault.value);

	const handlerRating$ = $((e: number) => {
		product.userRating = e;
	});

	useContextProvider(productContext, product);

	return (
		<div class="bg-white">
			<div class="mx-auto max-w-2xl px-4 pb-16 sm:px-6 py-10 lg:max-w-7xl lg:px-8">
				<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
					{/* Image gallery */}
					<ImageGallery images={product.images} />

					{/* Product info */}
					<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
						<h1 class="text-3xl font-bold tracking-tight text-gray-900">
							{product.name}
						</h1>

						{/* Reviews */}
						<div class="mt-3">
							<h3 class="sr-only">Reviews</h3>
							<div class="flex items-center">
								<div class="flex items-center">
									<RatingStar
										defaultRating={productDefault.value.rating ?? 0}
										rating={product.userRating ?? 0}
										changeRating$={handlerRating$}
										class="gap-1.5"
										StarProps={{
											class: "h-5 w-5 flex-shrink-0",
										}}
									/>
								</div>
								<p class="sr-only">{product.rating} out of 5 stars</p>
							</div>
						</div>

						<div class="mt-3">
							<h2 class="sr-only">Product information</h2>
							<p class="text-3xl tracking-tight text-gray-900">
								{product.price}
							</p>
						</div>

						{/* Description and details */}
						<div class="mt-6">
							<h3 class="sr-only">Description</h3>
							<div
								class="space-y-6 text-sm text-gray-700 font-montserrat"
								dangerouslySetInnerHTML={
									marked.parse(product.description) as string
								}
							/>
						</div>

						{/* Product form */}
						<FormToBag product={product} />

						{/* Product Additional details */}
						<AdditionalDetails
							details={product.details.map((item) => {
								return {
									name: item.name,
									items: marked.parse(item.items) as string,
								};
							})}
						/>
					</div>
				</div>
			</div>
		</div>
	);
});
