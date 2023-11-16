import { type HtmlHTMLAttributes, Slot, component$ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";

export type LinkOrButton = (
	| HtmlHTMLAttributes<HTMLButtonElement>
	| LinkProps
) & {
	isLink?: boolean;
};

export const LinkOrButton = component$<LinkOrButton>(({ isLink, ...props }) => {
	if (isLink) {
		return (
			<Link {...(props as LinkProps)}>
				<Slot />
			</Link>
		);
	}
	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button {...(props as HtmlHTMLAttributes<HTMLButtonElement>)}>
			<Slot />
		</button>
	);
});
