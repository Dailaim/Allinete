import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ButtonGoogle, type ButtonProps } from "./button-google";

const meta: Meta<ButtonProps> = {
	component: ButtonGoogle,
	title: "Components/Button/Google",
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Default: Story = {
	args: {
		text: undefined,
		full: true,
	},
	argTypes: {
		text: {
			type: "string",
		},
	},

	render: ({ ...props }) => <ButtonGoogle {...props} />,
};
