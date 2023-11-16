import type { Meta, StoryObj } from "storybook-framework-qwik";
import type { HeartProps } from "./heart";
import { Heart as HeartComponent } from "./index";

const meta: Meta<HeartProps> = {
	component: HeartComponent,
	title: "Components/Utils/Heart",
};

type Story = StoryObj<HeartProps>;

export default meta;

export const Heart: Story = {
	args: {
		glitter: false,
	},

	render: ({ ...props }) => <HeartComponent {...props} />,
};
