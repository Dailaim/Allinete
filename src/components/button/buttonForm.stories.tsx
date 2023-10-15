import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ButtonForm, type ButtonProps } from "./buttonForm";

const meta: Meta<ButtonProps> = {
	component: ButtonForm,
	title: "Components/Button/Form",
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
		glass: false,
	},

	render: ({ text, ...props }) => <ButtonForm {...props}>{text}</ButtonForm>,
};
