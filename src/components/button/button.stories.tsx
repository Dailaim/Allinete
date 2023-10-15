import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Button, type ButtonProps } from "./button";

const meta: Meta<ButtonProps> = {
	component: Button,
	title: "Components/Button/Default",
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

	render: ({ text, ...props }) => <Button {...props}>{text}</Button>,
};

export const Primary: Story = {
	args: {
		variant: "primary",
		text: "Primary",
	},

	render: ({ text, ...props }) => <Button {...props}>{text}</Button>,
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		text: "Secondary",
	},

	render: ({ text, ...props }) => <Button {...props}>{text}</Button>,
};
