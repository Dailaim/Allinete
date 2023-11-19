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
  useVisibleTask$,
} from "@builder.io/qwik";
import { TbChevronUp } from "@qwikest/icons/tablericons";
import { Motion } from "~/packages/motion";

export const context = createContextId<VerticalTapContext>("vertical-tap");

export const useVerticalMenu = () => useContext(context);

export const VerticalMenu = component$<HtmlHTMLAttributes<HTMLDivElement>>(
	(props) => {
		useContextProvider(context, useStore({
      interactive: false,
    }));

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

    const animation = [ 0,"100px","auto"]

		useTask$(() => {
			state[id] = false;
		});

    const interactive = useSignal(defaultOpen);

    useVisibleTask$(()=>{
      state[id] = defaultOpen;
    })


		return (
			<div class="">
				<button
					type="button"
					class="flex pr-5 py-2.5 w-full font-medium text-black items-center justify-between capitalize"
					onClick$={() => {
						state[id] = !state[id];
            if (!interactive.value) {
              interactive.value = true;
            }
					}}
				>
					{title}
					<TbChevronUp
						class={[
							"transition-transform duration-300 text-purple",
							"w-5 h-5",
							{
								"transform -rotate-180": !state[id],
							},
						]}
					/>
				</button>
				<Motion.div
					ref={ref}
					initial={{ 
          overflow: "hidden", 
          height: 0,
        }}
					animate={{
						overflow: state[id] ? "visible" : "hidden",
            height: state[id] 
            ? animation
            : interactive.value  
              ? animation.reverse()
              : 0,
					}}
					transition={{
						duration:  0.2 ,
            height: { duration:  0.15  },
						easing: "ease-in-out",
						overflow: { duration: state[id] ? 0.3 : 0  },
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
