import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Alert, type AlertProps } from "./index";

const meta: Meta<AlertProps> = {
	component: Alert,
	title: "Components/Alert/alert",
};

type Story = StoryObj<
	AlertProps & {
		text: string;
	}
>;

export default meta;

export const Default: Story = {
	args: {
		text: "Alert",
		variant: "success",
	},
	argTypes: {
		variant: {
			options: ["success", "danger"] as AlertProps["variant"][],
			control: { type: "radio" },
		},
	},

	render: ({ text, ...props }) => <Alert {...props}>{text}</Alert>,
};

export const Susses: Story = {
	args: {
		text: "Alert",
		variant: "success",
	},

	render: ({ text, ...props }) => <Alert {...props}>{text}</Alert>,
};

export const Danger: Story = {
	args: {
		text: "Alert",
		variant: "danger",
	},

	render: ({ text, ...props }) => <Alert {...props}>{text}</Alert>,
};
