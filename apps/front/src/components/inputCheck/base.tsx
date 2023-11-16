import type {
	InputHTMLAttributes,
	JSXChildren,
	JSXNode,
} from "@builder.io/qwik";
import { component$, useId } from "@builder.io/qwik";

type InputCheckProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string | JSXNode;
	render?: JSXChildren;
};

export const InputCheckBase = component$<InputCheckProps>(
	({ label, render: Render, type = "checkbox", ...props }) => {
		const id = useId();
		return (
			<div class="relative flex items-center gap-2.5">
				<div class="flex h-6 items-center">
					<input
						type={type}
						id={id}
						{...props}
						class={[
							"transition-all duration-300",
							"h-[1.15rem] w-[1.15rem]  border-purple text-gray checked:!ring-black focus:text-black focus:border-purple focus:ring-purple",
							//@ts-ignore
							{
								rounded: type === "checkbox",
							},
							//@ts-ignore
							props.class,
						]}
					/>
				</div>
				<div class="text-sm">
					<label for={props.id || id} class=" text-black capitalize">
						{label}
						{typeof Render === "function" ? <Render /> : Render}
					</label>
				</div>
			</div>
		);
	},
);

export const InputRadio = component$<Omit<InputCheckProps, "type">>((props) => {
	return <InputCheckBase {...props} type="radio" />;
});

export const InputCheck = component$<Omit<InputCheckProps, "type">>((props) => {
	return <InputCheckBase {...props} type="checkbox" />;
});
