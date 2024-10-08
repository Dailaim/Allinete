import type { HtmlHTMLAttributes, PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "../button";
import { Heart, RatingStar } from "../utils";

export type CardProps = {
	isWishlist?: boolean;
	toggleWishlist$?: PropFunction<() => void>;
	Action$?: PropFunction<() => void>;
	rating?: number;
	userRating?: number;
	setUserRating$?: PropFunction<(rating: number) => void>;
	image?: string;
	name?: string;
	price?: number;
	description?: string;
	currency?: string;
	offerPrice?: number;
	offerPercentage?: number;
	isOffer?: boolean;
	class?: HtmlHTMLAttributes<HTMLDivElement>["class"];
	href?: string;
	/* 	offerText?: string;
	offerExpiry?: string; */
};

// TODO: Add the other variants
// Create varian Out of Stock

export const Card = component$<CardProps>(
	({ toggleWishlist$, Action$, href, ...props }) => {
		const nav = useNavigate();
		return (
			<div
				role="link"
				onClick$={() => {
					if (href) nav(href);
				}}
				aria-labelledby={`card-${props.name}`}
				href={href ?? "#"}
				class={[
					"group w-72 font-montserrat  justify-center items-center bg-white flex gap-2.5 flex-col rounded overflow-hidden relative",
					//@ts-ignore
					props.class,
				]}
			>
				{href && (
					<a href={href} class="sr-only">
						{props.name}
					</a>
				)}

				<span class="w-full h-full">
					<img
						alt={props.name}
						src={props.image}
						class="aspect-square object-cover object-center w-full overflow-hidden self-stretch"
					/>
				</span>
				<Heart
					glitter={props.isWishlist}
					// eslint-disable-next-line qwik/valid-lexical-scope
					onClick$={toggleWishlist$}
					class={{
						"absolute right-0 top-0 mt-5 mr-5 group-hover:block hidden": true,
						"!block": props.isWishlist,
					}}
				/>
				{/* TODO: Create component tag and login in card for decorator.
        Example: discount, new, etc
      */}
				{/* {props.offerPercentage && (
				<Badge class="absolute left-0 top-0 mt-5 bg-pink">
					-{props.offerPercentage}%
				</Badge>
			)} */}

				<div class="flex w-full  flex-col mb-5 items-center px-5">
					<div class="flex flex-col pb-5 gap-1 w-full">
						<h4 class="capitalize line-clamp-2 group-hover:text-pink font-poppins ">
							{props.name}
						</h4>
						<div class="text-sm gap-1 items-center flex">
							<RatingStar
								rating={props.userRating ?? 0}
								changeRating$={props.setUserRating$}
								class="gap-1.5"
								StarProps={{
									class: "w-3.5 h-3.5",
								}}
							/>{" "}
							({props.rating ?? 0})
						</div>
						<span class="text-blue-gray text-xs line-clamp-2 leading-[157.143%]">
							{props.description}
						</span>

						<div class="text-xs text-blue-gray">
							<span class={{ "line-through": props.isOffer }}>
								{props.currency} {props.price}
							</span>
							{props.isOffer && (
								<span class="text-pink pl-1">
									{props.currency} {props.offerPrice}
								</span>
							)}
						</div>
					</div>

					<Button
						onClick$={(e) => {
							e.stopPropagation();
							// eslint-disable-next-line qwik/valid-lexical-scope
							Action$?.();
						}}
						type="button"
						class="w-full"
						variant="secondary"
					>
						Agregar al Carrito{" "}
					</Button>
				</div>
			</div>
		);
	},
);
