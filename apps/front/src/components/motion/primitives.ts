import type { MotionState } from "@motionone/dom";
import { createMotionState, createStyles, style } from "@motionone/dom";

import type { QRL } from "@builder.io/qwik";
import {
	$,
	noSerialize,
	useContext,
	useStore,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik";
import type { PresenceContextState } from "./presence";
import { PresenceContext } from "./presence";
import type { MotionStateQ, Options } from "./types";

export const onCompleteExit = (el: Element, fn: VoidFunction) =>
	el.addEventListener("motioncomplete", fn);

/** @internal */
export function useCreateAndBindMotionState(
	el: QRL<() => Element>,
	options: QRL<() => Options>,
	presenceState?: PresenceContextState,
	parentState?: MotionStateQ,
) {
	const state = useStore<MotionStateQ>({} as MotionStateQ);

	const init = $(async () => {
		const motion = createMotionState(
			await options(),
			parentState?.isMounted ? (parentState as MotionState) : undefined,
		);

		Object.keys(motion).forEach((key) => {
			// @ts-ignore
			state[key] = noSerialize(motion[key]);
		});
	});

	useTask$(async () => {
		init();
	});

	useVisibleTask$(async () => {
		init();
	});

	useVisibleTask$(async ({ cleanup, track }) => {
		track(() => state.mount);
		if (!state.mount) return;

		const unmount = state.mount(await el());
		state.update?.(await options());

		cleanup(async () => {
			if (presenceState && (await options()).exit) {
				state.setActive?.("exit", true);
				onCompleteExit(await el(), unmount);
			} else unmount();
		});
	});

	useVisibleTask$(
		async ({ track }) => {
			track(options);

			state.update?.(await options());
		},
		{
			strategy: "intersection-observer",
		},
	);

	return [state, createStyles(state.getTarget?.())] as const;
}

/**
 * createMotion provides MotionOne as a compact Solid primitive.
 *
 * @param target Target Element to animate.
 * @param options Options to effect the animation.
 * @param presenceState Optional PresenceContext override, defaults to current parent.
 * @returns Object to access MotionState
 */
export function useCreateMotion(
	target: Element,
	options: QRL<() => Options>,
	presenceState?: PresenceContextState,
): MotionStateQ {
	const [state, styles] = useCreateAndBindMotionState(
		$(() => target),
		options,
		presenceState,
	);

	for (const key in styles) {
		style.set(target, key, styles[key]);
	}

	return state;
}

/**
 * motion is a Solid directive that makes binding to elements easier.
 *
 * @param el Target Element to bind to.
 * @param props Options to effect the animation.
 */
export function useMotion(el: Element, props: QRL<() => Options>) {
	useCreateMotion(el, props, useContext(PresenceContext));
}
