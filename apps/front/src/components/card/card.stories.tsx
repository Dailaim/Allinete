import { $, component$, useSignal } from "@builder.io/qwik";
import type { Meta, StoryObj } from "storybook-framework-qwik";

import { Card, type CardProps } from "./card";

const meta: Meta<CardProps> = {
	component: Card,
	title: "Components/Card/card",
};

type Story = StoryObj<CardProps>;

export default meta;

const Layout = component$<CardProps>(
	({ setUserRating$, toggleWishlist$: tw, ...props }) => {
		const userRatingSig = useSignal(props.userRating);
		const changeRating$ = $((num: number) => {
			userRatingSig.value = num;
			setUserRating$?.(num);
		});
		const isWishlistSig = useSignal(props.isWishlist);
		const toggleWishlist$ = $(() => {
			isWishlistSig.value = !isWishlistSig.value;
			tw?.();
		});
		return (
			<div class="h-full w-full flex">
				<Card
					{...props}
					userRating={userRatingSig.value}
					setUserRating$={changeRating$}
					isWishlist={isWishlistSig.value}
					toggleWishlist$={toggleWishlist$}
				/>
			</div>
		);
	},
);

export const Default: Story = {
	args: {
		image: "https://picsum.photos/200",
		name: "Product Name",
		price: 100,
		description: "Product Description",
		currency: "$",
		rating: 4,
		userRating: 3,
		isWishlist: false,
		isOffer: false,
		offerPrice: 80,
		offerPercentage: 20,
	},

	render: ({ ...props }) => <Layout {...props} />,
};
