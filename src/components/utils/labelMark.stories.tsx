import type { Meta, StoryObj } from "storybook-framework-qwik";
import { LabelMark as LMComponent } from "./index";
import { type LabelMarkProps } from "./labelMark";

const meta: Meta<LabelMarkProps> = {
	title: "Components/Utils/LabelMark",
};

type Story = StoryObj<
	LabelMarkProps & {
		text: string;
	}
>;

export default meta;

export const LabelMark: Story = {
	args: {
		text: "label mark",
	},

	render: ({ text, ...props }) => <LMComponent {...props}>{text}</LMComponent>,
};
