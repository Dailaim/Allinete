import {
	type HTMLAttributes,
	component$,
	useId,
	useStylesScoped$,
} from "@builder.io/qwik";

import inputCSS from "./input.css?inline";

export type InputProps = HTMLAttributes<HTMLInputElement> & {
	cardProps?: HTMLAttributes<HTMLDivElement>;
};

export const Input = component$<InputProps>(
	({ class: ClassName, placeholder = "", cardProps, ...props }) => {
		useStylesScoped$(inputCSS);
		const linkID = useId();
		return (
			<>
				<div
					{...cardProps}
					class={[
						"inline-flex",
						//@ts-ignore
						cardProps?.class,
					]}
				>
					{/* @ts-ignore */}
					<input
						type="text"
						id={linkID}
						{...props}
						class={[
							"border-gray border rounded focus:border-black p-2.5",
							//@ts-ignore
							ClassName,
						]}
						placeholder={placeholder}
					/>
					<label class="text-purple text-sm select-none" for={linkID}>
						Name
					</label>
				</div>
			</>
		);
	},
);
