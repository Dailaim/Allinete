import type { NoSerialize, PropFunction } from "@builder.io/qwik";
import { type CSSProperties, type Component } from "@builder.io/qwik";

import type { JSX } from "@builder.io/qwik/jsx-runtime";
import type {
	InViewOptions,
	MotionKeyframes,
	MotionKeyframesDefinition,
	MotionStateContext,
	ValueKeyframesDefinition,
} from "@motionone/dom";
import type {
	CustomPointerEvent,
	MotionEvent,
	ViewEvent,
} from "@motionone/dom";
import type { AnimationOptions } from "@motionone/types";

export interface MotionEventHandlers {
	onMotionStart?: PropFunction<(event: MotionEvent) => void>;
	onMotionComplete?: PropFunction<(event: MotionEvent) => void>;
	onHoverStart?: PropFunction<(event: CustomPointerEvent) => void>;
	onHoverEnd?: PropFunction<(event: CustomPointerEvent) => void>;
	onPressStart?: PropFunction<(event: CustomPointerEvent) => void>;
	onPressEnd?: PropFunction<(event: CustomPointerEvent) => void>;
	onViewEnter?: PropFunction<(event: ViewEvent) => void>;
	onViewLeave?: PropFunction<(event: ViewEvent) => void>;
}

export type QwikCSSPropertyKeys = Exclude<
	keyof {
		[K in keyof CSSProperties as string extends K ? never : K]: never;
	},
	"transition"
>;

export type KeyframesDefinition = MotionKeyframesDefinition & {
	[K in QwikCSSPropertyKeys]?: ValueKeyframesDefinition;
};

export type Variant = KeyframesDefinition & {
	transition?: AnimationOptionsWithOverrides;
};

export type VariantDefinition = string | Variant;

export type AnimationOptionsWithOverrides = AnimationOptions & {
	[K in keyof KeyframesDefinition]: AnimationOptions;
};

export type Options = {
	initial?: false | VariantDefinition;
	animate?: VariantDefinition;
	inView?: VariantDefinition;
	hover?: VariantDefinition;
	press?: VariantDefinition;
	exit?: VariantDefinition;
	variants?: Record<string, Variant>;
	inViewOptions?: InViewOptions;
	transition?: AnimationOptionsWithOverrides;
};

export type MotionComponentProps = MotionEventHandlers & Options;

export type Tag = keyof JSX.IntrinsicElements;

export type MotionComponent = {
	// <Motion />
	(props: JSX.IntrinsicElements["div"] & MotionComponentProps): JSX.Element;
	// <Motion tag="div" />
	<T extends Tag>(
		props: JSX.IntrinsicElements[T] & MotionComponentProps & { tag: T },
	): JSX.Element;
};

export type MotionProxyComponent<T> = Component<T & MotionComponentProps>;

export type MotionProxy = MotionComponent & {
	// <Motion.div />
	[K in keyof JSX.IntrinsicElements]: MotionProxyComponent<
		JSX.IntrinsicElements[K]
	>;
};

declare module "@builder.io/qwik" {
	namespace JSX {
		interface Directives {
			motion: Options;
		}
	}
}

export type NoSerializeValue<T extends {}> = Record<
	keyof T,
	NoSerialize<T[keyof T]>
>;

export interface MotionStateQ {
	update: NoSerialize<(options: Options) => void>;
	getDepth: NoSerialize<() => number>;
	getTarget: NoSerialize<() => MotionKeyframes>;
	getOptions: NoSerialize<() => Options>;
	getContext: NoSerialize<() => MotionStateContext>;
	setActive: NoSerialize<
		(type: keyof MotionStateContext, isActive: boolean) => void
	>;
	mount: NoSerialize<(element: Element) => () => void>;
	isMounted: NoSerialize<() => boolean>;
	animateUpdates: NoSerialize<() => Generator<void>>;
}

// export only here so the `JSX` import won't be shaken off the tree:
export type E = JSX.Element;
