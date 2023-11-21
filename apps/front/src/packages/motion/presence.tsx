import {
	$,
	Signal,
	Slot,
	component$,
	createContextId,
	isSignal,
	useContextProvider,
	useSignal,
	useStore,
	useVisibleTask$,
} from "@builder.io/qwik";
import { ParentContext } from "./motion";

import { useCSSTransition } from "./useCSSTransition";

export const PresenceContext = createContextId<Signal<boolean>>(
	"presence-context-state",
);

/**
 * Perform exit/enter trantisions of children `<Motion>` components.
 *
 * accepts props:
 * - `initial` – *(Defaults to `true`)* – If `false`, will disable the first animation on all child `Motion` elements the first time `Presence` is rendered.
 * - `exitBeforeEnter` – *(Defaults to `false`)* – If `true`, `Presence` will wait for the exiting element to finish animating out before animating in the next one.
 *
 * @example
 * ```tsx
 * <Presence exitBeforeEnter>
 *   <Show when={toggle()}>
 *     <Motion.div
 *       initial={{ opacity: 0 }}
 *       animate={{ opacity: 1 }}
 *       exit={{ opacity: 0 }}
 *     />
 *   </Show>
 * </Presence>
 * ```
 */
export const Presence = component$<{
	initial?: boolean;
	show: Signal<boolean> | boolean;
	exitBeforeEnter?: boolean;
}>((props) => {
	const initialSig = useSignal(props.initial ?? false);

	useContextProvider(PresenceContext, initialSig);
	useContextProvider(ParentContext, useSignal(undefined));

	const { shouldMount, stage } = useCSSTransition(
		$(() => {
			return typeof props.show === "boolean" ? props.show : props.show.value;
		}),
		{
			timeout: 300,
			transitionOnAppear: false,
		},
	);

	useVisibleTask$(() => {
		initialSig.value = true;
	});

	return (
		<span>
			<Slot />
		</span>
	);

	// const render = (
	//   <>
	//       {createSwitchTransition(
	//         resolveFirst(() => props.children),
	//         {
	//           appear: initial,
	//           mode: props.exitBeforeEnter ? "out-in" : "parallel",
	//           onExit(el, remove) {
	//             const state = mountedStates.get(el)
	//             if (state && (state.getOptions() as Options).exit)
	//               onCompleteExit(el, remove)
	//             else remove()
	//           },
	//         }
	//       )}
	//   </>

	// )

	// initial.value = true
});
