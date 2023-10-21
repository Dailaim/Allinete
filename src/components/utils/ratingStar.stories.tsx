import { $, HtmlHTMLAttributes, component$, useSignal } from "@builder.io/qwik";
import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { HeartProps } from "./heart";
import { RatingStar } from "./index";
import { RatingStarProps } from "./ratingStar";
import { StarRatings } from "./star/starRatings";

const meta: Meta<RatingStarProps> = {
	component: RatingStar,
	title: "Components/Utils/RatingStar",
};

type Story = StoryObj<RatingStarProps>;

export default meta;

const Layaout = component$<HtmlHTMLAttributes<HTMLElement>>((props) => {
	const rating = useSignal(0);
	const changeRating = $((newRating: number) => {
		rating.value = newRating;
	});
	return (
		<StarRatings
			rating={rating.value}
			isSelectable={true}
			starRatedColor={"blue"}
			changeRating$={changeRating}
			numberOfStars={5}
		/>
	);
});

const Layaout2 = component$<HtmlHTMLAttributes<HTMLElement>>((props) => {
	const rating = useSignal(3);
	const changeRating = $((newRating: number) => {
		rating.value = newRating;
	});
	return (
		<>
			<RatingStar
				defaultRating={rating.value}
				rating={rating.value}
				changeRating$={changeRating}
				numberOfStars={5}
			/>
			<p class="text-xl">Rating: {rating}</p>
		</>
	);
});

export const Heart: Story = {
	args: {
		defaultRating: 3,
	},

	render: ({ ...props }) => {
		return <Layaout2 {...props} />;
	},
};
