import { component$ } from "@builder.io/qwik";
import { SVGHeart } from "../icons";
import { type SVGProps } from "../icons/props";

export type HeartProps = SVGProps & {
	glitter?: boolean;
	classGlitter?: SVGProps["class"];
};

export const Heart = component$<HeartProps>(
	({ class: className, classGlitter, ...props }) => {
		return (
			<>
				<SVGHeart
					{...props}
					class={[
						"hover:text-pink",
						//@ts-ignore
						{
							"text-purple-300": !props.glitter,
							"text-black": props.glitter,
						},
						//@ts-ignore
						className,
						//@ts-ignore
						props.glitter ? classGlitter : null,
					]}
				/>
			</>
		);
	},
);
