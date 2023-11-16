import type { HtmlHTMLAttributes } from "@builder.io/qwik";
import {
	Slot,
	component$,
	createContextId,
	useContext,
	useContextProvider,
	useId,
	useSignal,
	useStore,
	useTask$,
} from "@builder.io/qwik";
import { Motion } from "@motionone/qwik";
import { TbChevronUp } from "@qwikest/icons/tablericons";

export const context = createContextId<VerticalTapContext>("vertical-tap");

export const useVerticalMenu = () => useContext(context);

export const VerticalMenu = component$<HtmlHTMLAttributes<HTMLDivElement>>(
	(props) => {
		useContextProvider(context, useStore({}));

		return (
			<div {...props}>
				<Slot />
			</div>
		);
	},
);

export type VerticalTapProps = {
	defaultOpen?: boolean;
	title: string;
};

export const VerticalTap = component$<VerticalTapProps>(
	({ defaultOpen = false, title }) => {
		const id = useId();
		const state = useVerticalMenu();
		const ref = useSignal<HTMLElement>();

		useTask$(() => {
			state[id] = defaultOpen;
		});

		return (
			<div class="">
				<button
					type="button"
					class="flex pr-5 py-2.5 w-full font-medium text-black items-center justify-between capitalize"
					onClick$={() => {
						state[id] = !state[id];
					}}
				>
					{title}
					<TbChevronUp
						class={[
							"transition-transform duration-300 text-purple",
							"w-5 h-5",
							{
								"transform rotate-180": !state[id],
							},
						]}
					/>
				</button>

				<Motion.div
					ref={ref}
					initial={{ overflow: "hidden", opacity: 0, maxHeight: "0px" }}
					animate={{
						overflow: state[id] ? "visible" : "hidden",
						opacity: state[id] ? 1 : 0,
						maxHeight: state[id] ? "10000px" : "0px",
					}}
					transition={{
						duration: 0.2,
						easing: "ease-in-out",
						overflow: { duration: 0.3 },
						maxHeight: { duration: 0.15 },
					}}
				>
					<div class={["gap-2.5 flex flex-col my-2.5"]}>
						<Slot />
					</div>
				</Motion.div>
			</div>
		);
	},
);

type VerticalTapContext = {
	[key: string]: boolean;
};
