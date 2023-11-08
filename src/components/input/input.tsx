import {
	type HTMLAttributes,
	InputHTMLAttributes,
	component$,
	useId,
	useStylesScoped$,
} from "@builder.io/qwik";

import inputCSS from "./input.css?inline";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	classContent?: HTMLAttributes<HTMLDivElement>["class"];
	label?: string;
};
// FIX add input name and label
export const Input = component$<InputProps>(
	({
		class: ClassName,
		placeholder = "",
		classContent = "",
		label = "",
		...props
	}) => {
		useStylesScoped$(inputCSS);
		const linkID = useId();
		return (
			<>
				<div
					class={[
						"inline-flex",
						//@ts-ignore
						classContent,
					]}
				>
					<input
						type="text"
						id={linkID}
						{...props}
						class={[
							"border-gray border rounded focus:border-black p-2.5",
							"shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-purple focus:ring-2 focus:ring-inset focus:ring-pink",
							//@ts-ignore
							ClassName,
						]}
						placeholder={placeholder}
					/>
					<label class="text-purple text-sm select-none" for={linkID}>
						{label}
					</label>
				</div>
			</>
		);
	},
);
