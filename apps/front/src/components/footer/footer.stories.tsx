import type { Meta, StoryObj } from "storybook-framework-qwik";
import { qwikCityDecorator } from "storybook-framework-qwik/qwik-city-decorator";
import { Footer } from "./footer";

const meta: Meta = {
	component: Footer,
	title: "Components/Footer/Footer",
};

type Story = StoryObj<{
	text: string;
}>;

export default meta;

export const Default: Story = {
	args: {
		text: "Badge",
	},
	render: ({ text, ...props }) => <Footer {...props}>{text}</Footer>,
	//@ts-ignore
	decorators: [qwikCityDecorator],
};
