import type {
	MotionComponentProps,
	MotionProxy,
	MotionProxyComponent,
} from "./types";

import type { CSSProperties, NoSerialize, Signal } from "@builder.io/qwik";
import {
	$,
	Slot,
	_restProps,
	component$,
	createContextId,
	createElement,
	useContext,
	useContextProvider,
	useSignal,
} from "@builder.io/qwik";

import type { MotionState } from "motion";
import { PresenceContext } from "./presence";
import { useCreateAndBindMotionState } from "./primitives";

const OPTION_KEYS = [
	"initial",
	"animate",
	"inView",
	"inViewOptions",
	"hover",
	"press",
	"variants",
	"transition",
	"exit",
];

const ATTR_KEYS = [
	"tag",
	"ref",
	"style",
	"onMotionStart",
	"onMotionComplete",
	"onHoverStart",
	"onHoverEnd",
	"onPressStart",
	"onPressEnd",
	"onViewEnter",
	"onViewLeave",
] as const;

export const ParentContext =
	createContextId<Signal<NoSerialize<MotionState | undefined>>>("motion-state");

const useElement = (target?: Signal<Element | undefined>) => {
	if (target) return target;
	const element = useSignal<Element | undefined>();
	return element;
};

/** @internal */
const MotionComponent = component$<
	MotionComponentProps & {
		tag?: keyof HTMLElementTagNameMap;
		ref?: Signal<Element>;
		style?: CSSProperties;
	}
>(
	({
		tag,
		initial,
		animate,
		inView,
		inViewOptions,
		hover,
		press,
		variants,
		transition,
		exit,
		ref: Targer,
		style,
		...props
	}) => {
		const ress = _restProps(props, [...ATTR_KEYS, ...OPTION_KEYS]);

		if (!tag) throw new Error("tag required");

		const element = useElement(Targer);

		const [state, style2] = useCreateAndBindMotionState(
			element,
			$(() => ({
				animate,
				inView,
				inViewOptions,
				hover,
				press,
				variants,
				transition,
				exit,
				initial,
			})),
			useContext(PresenceContext),
			useContext(ParentContext),
		);

		useContextProvider(ParentContext, state);

		return createElement(tag, {
			ref: element,
			onMotionStart: props.onMotionStart,
			onMotionComplete: props.onMotionComplete,
			onHoverStart: props.onHoverStart,
			onHoverEnd: props.onHoverEnd,
			onPressStart: props.onPressStart,
			onPressEnd: props.onPressEnd,
			onViewEnter: props.onViewEnter,
			onViewLeave: props.onViewLeave,
			...ress,
			style: {
				...style,
				...style2,
			},
			children: <Slot />,
		});
	},
);

/**
 * Renders an animatable HTML or SVG element.
 *
 * @component
 * Animation props:
 * - `animate` a target of values to animate to. Accepts all the same values and keyframes as Motion One's [animate function](https://motion.dev/dom/animate). This prop is **reactive** – changing it will animate the transition element to the new state.
 * - `transition` for changing type of animation
 * - `initial` a target of values to animate from when the element is first rendered.
 * - `exit` a target of values to animate to when the element is removed. The element must be a direct child of the `<Presence>` component.
 *
 * @example
 * ```tsx
 * <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}/>
 * ```
 *
 * Interaction animation props:
 *
 * - `inView` animation target for when the element is in view
 * - `hover` animate when hovered
 * - `press` animate when pressed
 *
 * @example
 * ```tsx
 * <Motion.div hover={{ scale: 1.2 }} press={{ scale: 0.9 }}/>
 * ```
 */
export const Motion = new Proxy(MotionComponent, {
	get:
		(_, tag: keyof HTMLElementTagNameMap): MotionProxyComponent<unknown> =>
		(props) =>
			<MotionComponent {...props} tag={tag} />,
}) as unknown as MotionProxy;

export const MotionProvider = component$(() => {
	useContextProvider(ParentContext, useSignal(undefined));
	useContextProvider(PresenceContext, useSignal(false));
	return <Slot />;
});
