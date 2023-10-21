import type { Meta, StoryObj } from "storybook-framework-qwik";
import Carousel34 from "~/img/res/pexels-anderson-guerra-1115128.jpg?jsx";
import { SwiperContainer, SwipeSlide, } from "./swiper";

import { Slot, component$, useTask$, useVisibleTask$ } from "@builder.io/qwik";
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

const meta: Meta<{}> = {
	component: SwiperContainer,
	title: "Components/Carousel/swiper",
};

type Story = StoryObj<{} & {}>;

export default meta;

export const Default: Story = {
	args: {},
	argTypes: {},

	render: ({ text, ...props }) => <Layout {...props} />,
};
