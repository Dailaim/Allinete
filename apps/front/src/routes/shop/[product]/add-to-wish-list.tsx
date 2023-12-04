import { $, component$ } from "@builder.io/qwik";
import { Heart } from "~/components/utils";
import { useProductCtx } from "./context-id-product";

export const ButtonAddToWishList = component$(() => {
	const product = useProductCtx();

	const handlerWishList$ = $(() => {
		product.isWishlist = !product.isWishlist;

		// TODO: Add to wishlist handler here and update the product.isWishlist in backend
	});

	return (
		<button
			onClick$={handlerWishList$}
			class="group w-full col-span-3 whitespace-nowrap md:col-span-2 flex  text-sm capitalize  p-3 items-center justify-center border px-10 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 ease-in-out"
			type="button"
		>
			<span class="sr-only">Add to favorites</span>
			{product.isWishlist ? "Remove" : "Add to wishlist"}

			<Heart
				glitter={product.isWishlist}
				class={[
					"flex-shrink-0 h-6 group-hover:text-black text-pink transition-colors duration-300 ease-in-out",
					{
						"opacity-0": !product.isWishlist,
						"w-[1px]": !product.isWishlist,
						"w-6": product.isWishlist,
						"ml-2": product.isWishlist,
					},
				]}
				aria-hidden="true"
			/>
		</button>
	);
});
