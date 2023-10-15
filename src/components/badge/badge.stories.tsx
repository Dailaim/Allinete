import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Badge, type BadgeProps } from "./badge";

const meta: Meta<BadgeProps> = {
	component: Badge,
	title: "Components/Badge/badge",
};

type Story = StoryObj<
	BadgeProps & {
		text: string;
	}
>;

export default meta;

export const Default: Story = {
	args: {
		text: "Badge",
	},
	render: ({ text, ...props }) => (
		<div class="w-full h-full bg-off-white">
			<Badge {...props}>{text}</Badge>
		</div>
	),
};
