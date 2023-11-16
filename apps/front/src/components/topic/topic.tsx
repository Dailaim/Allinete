import { type HtmlHTMLAttributes, Slot, component$ } from "@builder.io/qwik";

import { Link } from "@builder.io/qwik-city";
import { SVGBloomLeft, SVGBloomRight } from "../icons";

export type TopicProps = {
	title?: string;
	subTitle?: string;
	link?: string;
	class?: HtmlHTMLAttributes<HTMLDivElement>["class"];
	titleClass?: HtmlHTMLAttributes<HTMLHeadingElement>["class"];
};

export const Topic = component$<TopicProps>(
	({ link, subTitle, title, class: ClassName, ...props }) => {
		return (
			<div
				class={[
					"flex justify-center flex-col items-center select-none",
					//@ts-ignore
					ClassName,
				]}
			>
				<div class="flex items-center gap-2.5">
					<SVGBloomLeft />
					<h2
						class={[
							"uppercase inline-flex font-bold text-2xl  text-center",
							//@ts-ignore
							props.titleClass,
						]}
					>
						{title}
						<Slot name="title" />
					</h2>
					<SVGBloomRight />
				</div>
				<Link
					href={link}
					class="text-blue-gray hover:text-pink capitalize cursor-pointer"
				>
					{subTitle}
				</Link>
			</div>
		);
	},
);
