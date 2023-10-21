import type { Meta, StoryObj } from "storybook-framework-qwik";

import {
	SVGArrowRight,
	SVGCircleArrowLeft,
	SVGCircleArrowRight,
	SVGDangerCircle,
	SVGEye,
	SVGGoogleColor,
	SVGHeart,
	SVGHeartGlitter,
	SVGStar,
	SVGSussesCircle,
} from "./index";
import type { SVGProps } from "./props";

const meta: Meta<SVGProps> = {
	component: SVGGoogleColor,
	title: "Components/Icons/utils",
	argTypes: {
		color: {
			control: { type: "color" },
		},
	},
};

type Story = StoryObj<SVGProps>;

export default meta;

export const Google: Story = {
	args: {},
	decorators: [
		(Story) => (
			<div style={{ margin: "3em" }}>
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
	render: ({ ...props }) => <SVGGoogleColor {...props} />,
};

export const ArrowRight: Story = {
	args: {},
	render: ({ ...props }) => <SVGArrowRight {...props} />,
};

type StoryEye = StoryObj<
	SVGProps & {
		open?: boolean;
	}
>;

export const Eye: StoryEye = {
	args: {
		open: true,
	},
	render: ({ ...props }) => <SVGEye {...props} />,
};

export const CircleArrowLeft: Story = {
	args: {},
	render: ({ ...props }) => <SVGCircleArrowLeft {...props} />,
};

export const CircleArrowRight: Story = {
	args: {},
	render: ({ ...props }) => <SVGCircleArrowRight {...props} />,
};

export const DangerCircle: Story = {
	args: {},
	render: ({ ...props }) => <SVGDangerCircle {...props} />,
};

export const SussesCircle: Story = {
	args: {},
	render: ({ ...props }) => <SVGSussesCircle {...props} />,
};

export const Star: Story = {
	args: {
		underline: false,
	},
	render: ({ ...props }) => <SVGStar {...props} />,
};

export const Heart: Story = {
	args: {
		glitter: false,
	},
	render: ({ ...props }) => <SVGHeart {...props} />,
};
