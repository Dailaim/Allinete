import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Input, type InputProps } from "./input";

const meta: Meta<InputProps> = {
	component: Input,
	title: "Components/Input/input",
};

type Story = StoryObj<InputProps>;

export default meta;

export const Default: Story = {
	render: ({ ...props }) => <Input {...props} />,
};
