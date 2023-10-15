import { type HTMLAttributes, Slot, component$ } from "@builder.io/qwik";
import { SVGDangerCircle, SVGSussesCircle } from "../icons";

//TODO: add the other variants
type variant = "success" | "danger" /* | "info" | "warning" */;

const variants = {
	success: {
		class: "text-green bg-green-100",
		icon: SVGSussesCircle,
	},
	/* 	warning: "bg-yellow-50", */
	danger: {
		class: "text-red-600 bg-red-100",
		icon: SVGDangerCircle,
	},
	null: {
		class: null,
		icon: null,
	},
	/* 	info: "bg-blue-50", */
};

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
	variant?: variant;
};
export const Alert = component$<AlertProps>(
	({ variant = "success", class: ClassName, ...props }) => {
		const Icon = variants[variant].icon;
		return (
			<div
				{...props}
				class={[
					variants[variant].class,
					"rounded-md p-2.5",
					"inline-flex gap-2.5",
					"transition-all duration-200 ease-in-out",
					//@ts-ignore
					ClassName,
				]}
			>
				<div class="flex-shrink-0 flex items-center">
					{Icon && <Icon class="h-5 w-5" />}
					<Slot name="icon" />
				</div>
				<div class="flex-1 md:flex md:justify-between ">
					<p>
						<Slot />
					</p>
				</div>
			</div>
		);
	},
);
