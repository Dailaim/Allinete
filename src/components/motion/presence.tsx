import {
	Slot,
	component$,
	createContextId,
	useContextProvider,
	useStore,
} from "@builder.io/qwik";
import { ParentContext } from "./motion";
import type { MotionStateQ } from "./types";

export type PresenceContextState = {
	initial?: boolean | null;
};
export const PresenceContext = createContextId<PresenceContextState>(
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
	exitBeforeEnter?: boolean;
}>((props) => {
	const store = useStore({
		initial: props.initial !== false,
	});

	useContextProvider(PresenceContext, store);
	useContextProvider(ParentContext, {} as MotionStateQ);

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
	return <Slot />;
});
