import type { InputHTMLAttributes } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

interface OptionColorProps extends InputHTMLAttributes<HTMLInputElement> {
	key: string;
	nameColor: string;
	isChecked: boolean;
	bgColor: string;
}

export const OptionColor = component$<OptionColorProps>(
	({ key, nameColor, isChecked, ...props }) => {
		return (
			<div
				style={{ backgroundColor: props.bgColor }}
				key={key}
				class={[
					{
						"ring-blue-gray-600": isChecked,
						"ring-offset-blue-gray-400": "#ffffff" === props.bgColor,
					},
					"h-8 w-8 ",
					"relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none",
					"ring",
					"hover:ring-4 ring-offset-1 ring-blue-gray-200",
				]}
			>
				<label for={`color-${props.name}`} class="sr-only">
					{nameColor}
				</label>
				<input
					{...props}
					type="radio"
					class="absolute opacity-0 w-full h-full cursor-pointer"
				/>
			</div>
		);
	},
);
