import type { MotionState } from "@motionone/dom";
import { createMotionState, createStyles, style } from "@motionone/dom";

import type { NoSerialize, QRL, Signal } from "@builder.io/qwik";
import {
	$,
	noSerialize,
	useContext,
	useSignal,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik";

import { PresenceContext } from "./presence";
import type { Options } from "./types";

export const onCompleteExit = (fn: VoidFunction, el?: Element) =>
	el?.addEventListener("motioncomplete", fn);

/** @internal */
export function useCreateAndBindMotionState(
	target: Signal<Element | undefined>,
	options: QRL<() => Options>,
	presenceState?: Signal<boolean>,
	parentState?: Signal<NoSerialize<MotionState | undefined>>,
) {
	const state = useSignal<NoSerialize<MotionState | undefined>>();

	const init = $(async () => {
		state.value = noSerialize(
			createMotionState(await options(), parentState?.value),
		);
	});

	useTask$(async () => {
		init();
	});

	useVisibleTask$(async () => {
		init();
	});

	useVisibleTask$(async ({ cleanup, track }) => {
		track(() => state.value);
		if (!target.value) return;
		if (!state.value) return;

		const unmount = state.value.mount(target.value);
		state.value.update(await options());

		cleanup(async () => {
			if (presenceState?.value && (await options()).exit) {
				state.value?.setActive("exit", true);
				onCompleteExit(unmount, target.value);
			} else unmount();
		});
	});

	useVisibleTask$(
		async ({ track }) => {
			track(options);

			state.value?.update(await options());
		},
		{
			strategy: "intersection-observer",
		},
	);

	return [state, createStyles(state.value?.getTarget())] as const;
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
	target: Signal<Element | undefined>,
	options: QRL<() => Options>,
	presenceState?: Signal<boolean>,
) {
	const [state, styles] = useCreateAndBindMotionState(
		target,
		options,
		presenceState,
	);

	useTask$(({ track }) => {
		track(() => state.value);
		if (!target.value) return;
		for (const key in styles) {
			style.set(target.value, key, styles[key]);
		}
	});

	return state;
}

/**
 * motion is a Solid directive that makes binding to elements easier.
 *
 * @param el Target Element to bind to.
 * @param props Options to effect the animation.
 */
export function useMotion(
	el: Signal<Element | undefined>,
	props: QRL<() => Options>,
) {
	return useCreateMotion(el, props, useContext(PresenceContext));
}
