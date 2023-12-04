import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ButtonText, type ButtonTextProps } from "./button-text";

const meta: Meta<ButtonTextProps> = {
	component: ButtonText,
	title: "Components/Button/Text",
};

type Story = StoryObj<
	ButtonTextProps & {
		text: string;
	}
>;

export default meta;

export const Default: Story = {
	args: {
		text: "Default",
	},

	render: ({ text, ...props }) => <ButtonText {...props}>{text}</ButtonText>,
};
