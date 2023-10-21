import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Navbar } from "./navbar";

const meta: Meta = {
	component: Navbar,
	title: "Components/Navbar/navbar",
};

type Story = StoryObj<{
	text: string;
}>;

export default meta;

export const Default: Story = {
	args: {
		text: "Badge",
	},
	render: ({ text, ...props }) => <Navbar {...props}>{text}</Navbar>,
};
