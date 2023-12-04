import type { Meta, StoryObj } from "storybook-framework-qwik";
import Carousel34 from "~/img/res/pexels-anderson-guerra-1115128.jpg?jsx";
import type { SwiperProps } from "./swiper";
import { SwipeSlide, SwiperContainer } from "./swiper";

import { component$ } from "@builder.io/qwik";
import Carousel35 from "~/img/res/pexels-anderson-guerra-1115350.jpg?jsx";

import Carousel36 from "~/img/res/pexels-freestocksorg-457704.jpg?jsx";

import { register } from "swiper/element";
import Carousel37 from "~/img/res/pexels-1749452.jpg?jsx";

const images = [Carousel34, Carousel35, Carousel36, Carousel37];
register();
const Layout = component$<{} & {}>(({ ...props }) => {
	return (
		<SwiperContainer {...props}>
			{images.map((Image, index) => (
				<SwipeSlide key={index + 23131231}>
					<Image />
				</SwipeSlide>
			))}
		</SwiperContainer>
	);
});

const meta: Meta<SwiperProps> = {
	component: SwiperContainer,
	title: "Components/Carousel/swiper",
};

type Story = StoryObj<SwiperProps>;

export default meta;

export const Default: Story = {
	args: {},
	argTypes: {},

	render: ({ ...props }) => <Layout {...props} />,
};
