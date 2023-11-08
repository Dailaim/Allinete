import { QwikCityMockProvider } from "@builder.io/qwik-city";
import type { Meta, StoryObj } from "storybook-framework-qwik";
import {
	VerticalMenu,
	VerticalTap,
	type VerticalTapProps,
} from "./vertical-tap";

const meta: Meta<VerticalTapProps> = {
	component: VerticalTap,
	title: "Pages/taps/verticalMenu",
};

type Story = StoryObj<VerticalTapProps>;

export default meta;

export const Default: Story = {
	args: {},
	render: ({ ...props }) => (
		<>
			<VerticalMenu class="divide-y-2 divide-gray-200">
				<VerticalTap {...props} defaultOpen>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
				</VerticalTap>
				<VerticalTap {...props}>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
				</VerticalTap>
				<VerticalTap {...props} defaultOpen>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
				</VerticalTap>
				<VerticalTap {...props}>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
					<p>Lorem ipsum dolor,</p>
				</VerticalTap>
			</VerticalMenu>
		</>
	),
};
