import type { Meta, StoryObj } from "storybook-framework-qwik";
import { type ButtonProps, ButtonText } from "./buttonText";

const meta: Meta<ButtonProps> = {
	component: ButtonText,
	title: "Components/Button/Text",
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

	render: ({ text, ...props }) => <ButtonText {...props}>{text}</ButtonText>,
};
