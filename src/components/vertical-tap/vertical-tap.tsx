import { sign } from "crypto";
import {
	HtmlHTMLAttributes,
	Slot,
	component$,
	createContextId,
	useContext,
	useContextProvider,
	useId,
	useSignal,
	useStore,
	useStylesScoped$,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik";
import { TbChevronUp } from "@qwikest/icons/tablericons";
import { animate, glide, stagger } from "motion";

export const context = createContextId<VerticalTapContext>("vertical-tap");

export const useVerticalMenu = () => useContext(context);

export const VerticalMenu = component$<HtmlHTMLAttributes<HTMLDivElement>>(
	(props) => {
		useContextProvider(context, useStore({}));

		useVisibleTask$(() => {
			animate(
				".expandable-content[data-close]",
				{
					opacity: [1, 0],
					maxHeight: ["1000px", "0px"],
				},
				{
					duration: 0.7,
					easing: "ease-in-out",
				},
			);
		});

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
		useStylesScoped$(`

    .expandable-content[data-open] {
            
      overflow: visible;
      transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
      animation: expand 0.2s ease-in-out forwards;
    }
    
    @keyframes expand {
      0% {
        max-height: 0;
        opacity: 0;
      }
      100% {
        max-height: 1000px; 
        opacity: 1;
      }
    }

    @keyframes collapse {
      0% {
        max-height: 1000px; 
        opacity: 1;
      }
      100% {
        max-height: 0;
        opacity: 0;
      }
    }

    `);

		const id = useId();
		const state = useVerticalMenu();

		useTask$(() => {
			state[id] = defaultOpen;
		});

		useVisibleTask$(({ track }) => {
			track(() => state[id]);
			if (state[id]) return;
			animate(
				`.expandable-content[data-id="${id}"]`,
				{
					overflow: "hidden",
					opacity: [1, 0],
					maxHeight: ["1000px", "0px"],
				},
				{
					duration: 0.2,
					easing: "ease-in-out",
				},
			);
		});

		return (
			<div class="">
				<button
					type="button"
					class="flex pr-5 py-2.5 w-full font-medium text-black items-center justify-between capitalize"
					onClick$={() => {
						state[id] = !state[id];
						console.log(state[id]);
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

				<div
					data-open={state[id]}
					data-close={!state[id]}
					data-id={id}
					class={["expandable-content"]}
				>
					<div class={["gap-2.5 flex flex-col my-2.5"]}>
						<Slot />
					</div>
				</div>
			</div>
		);
	},
);

type VerticalTapContext = {
	[key: string]: boolean;
};
