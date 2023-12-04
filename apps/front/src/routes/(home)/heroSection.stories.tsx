import { QwikCityMockProvider } from "@builder.io/qwik-city";
import type { Meta, StoryObj } from "storybook-framework-qwik";
import { HeroSection } from "./hero-section";

const meta: Meta<{
	text: string;
}> = {
	component: HeroSection,
	title: "Pages/Home/HeroSection",
};

type Story = StoryObj<{
	text: string;
}>;

export default meta;

export const Default: Story = {
	args: {},
	render: ({ ...props }) => (
		<>
			<QwikCityMockProvider url="http://localhost:6006/?path=/docs/pages-home-herosection--docs">
				<HeroSection {...props} />
			</QwikCityMockProvider>
			|
		</>
	),
};
