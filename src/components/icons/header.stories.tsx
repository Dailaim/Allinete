import type { Meta, StoryObj } from "storybook-framework-qwik";
import {
	SVGAccount,
	SVGAccountWithName,
	SVGCart,
	SVGCartWithName,
	SVGMenu,
	SVGMenuWithName,
	SVGSearch,
	SVGSearchWithName,
} from "./index";
import type { SVGProps, SVGWithNameProps } from "./props";

const meta: Meta<SVGProps> = {
	component: SVGCart,
	title: "Components/Icons/header",
	argTypes: {
		color: {
			control: { type: "color" },
		},
	},
};

type Story = StoryObj<SVGProps>;

export default meta;

export const Card: Story = {
	args: {},
	render: ({ ...props }) => <SVGCart {...props} />,
};

export const Account: Story = {
	args: {},
	render: ({ ...props }) => <SVGAccount {...props} />,
};

export const Search: Story = {
	args: {},
	render: ({ ...props }) => <SVGSearch {...props} />,
};
export const Menu: Story = {
	args: {},
	render: ({ ...props }) => <SVGMenu {...props} />,
};

type StoryWithName = StoryObj<SVGWithNameProps>;

export const CardWithName: StoryWithName = {
	args: {
		name: undefined,
	},
	argTypes: {
		name: {
			control: { type: "text" },
		},
	},
	render: ({ color, ...props }) => (
		<SVGCartWithName
			{...props}
			style={{
				color,
			}}
		/>
	),
};

export const AccountWithName: StoryWithName = {
	args: {
		name: undefined,
	},
	argTypes: {
		name: {
			control: { type: "text" },
		},
	},
	render: ({ color, ...props }) => (
		<SVGAccountWithName
			{...props}
			style={{
				color,
			}}
		/>
	),
};

export const SearchWithName: StoryWithName = {
	args: {
		name: undefined,
	},
	argTypes: {
		name: {
			control: { type: "text" },
		},
	},
	render: ({ color, ...props }) => (
		<SVGSearchWithName
			{...props}
			style={{
				color,
			}}
		/>
	),
};

export const MenuWithName: StoryWithName = {
	args: {
		name: undefined,
	},
	argTypes: {
		name: {
			control: { type: "text" },
		},
	},
	render: ({ color, ...props }) => (
		<SVGMenuWithName
			{...props}
			style={{
				color,
			}}
		/>
	),
};
