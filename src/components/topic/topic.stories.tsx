import type { Meta, StoryObj } from "storybook-framework-qwik";
import { qwikCityDecoratorStory } from "~/libs/QwikCityDecoratorStory";
import { Topic, type TopicProps } from "./topic";

const meta: Meta<TopicProps> = {
	component: Topic,
	args: {
		title: "Topic",
		subTitle: "Sub Title",
	},
	title: "Components/Topic/topic",
	decorators: [qwikCityDecoratorStory],
};

type Story = StoryObj<TopicProps>;

export default meta;

export const Default: Story = {
	render: ({ ...props }) => <Topic {...props} />,
};
