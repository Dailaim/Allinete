import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ButtonArrow, type ButtonProps } from "./button-arrow";

const meta: Meta<ButtonProps> = {
	component: ButtonArrow,
	title: "Components/Button/Arrow",
};

type Story = StoryObj<
	ButtonProps & {
		text: string;
	}
>;

export default meta;

export const Default: Story = {
	args: {
		text: "Default",
	},

	render: ({ text, ...props }) => <ButtonArrow {...props}>{text}</ButtonArrow>,
};
