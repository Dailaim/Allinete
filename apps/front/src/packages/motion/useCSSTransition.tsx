import { useSignal,  useVisibleTask$ } from "@builder.io/qwik";
// import type { QRL } from "@builder.io/qwik";

export type Stage = "enterFrom" | "enterTo" | "leaveFrom" | "leaveTo" | "idle";

export function useCSSTransition<T extends object>(
	store: T,
	value: keyof T,
	{ timeout = 0, transitionOnAppear = false },
) {
	if (typeof store[value] !== "boolean")
		new Error("useCSSTransition only works with boolean values");
	// the stage of transition - 'from' | 'enter' | 'leave'
	const stage = useSignal<Stage>(transitionOnAppear ? "enterFrom" : "idle");

	const appeared = useSignal(false);

	// the timer for should mount
	const timer = useSignal<Canceller>({});
	const shouldMount = useSignal<boolean>(store[value] as boolean);

	useVisibleTask$(async function handleStateChange({ track }) {
		track(() => store[value]);
		console.log("value", value);
		clearAnimationFrameTimeout(timer.value);
		const val = store[value];
		// when true - trans from to enter
		// when false - trans enter to leave, unmount after timeout

		if (val) {
			if (appeared.value) {
				stage.value = "enterFrom";
			}
			shouldMount.value = true;
			appeared.value = true;
			// in the next tick change to 'enterTo'
			timer.value = setAnimationFrameTimeout(() => {
				stage.value = "enterTo";
			});
		} else if (shouldMount.value) {
			stage.value = "leaveFrom";

			// Change to 'leaveTo' in the next tick
			setAnimationFrameTimeout(() => {
				stage.value = "leaveTo";
			});

			// unmount the element after the specified timeout
			timer.value = setAnimationFrameTimeout(() => {
				shouldMount.value = false;
			}, timeout);
		}

		return () => {
			clearAnimationFrameTimeout(timer.value);
		};
	});

	return {
		stage,
		shouldMount,
	};
}

function setAnimationFrameTimeout(callback: () => void, timeout = 0) {
	const startTime = performance.now();
	const canceller: Canceller = {};

	function call() {
		canceller.id = requestAnimationFrame((now) => {
			if (now - startTime > timeout) {
				callback();
			} else {
				call();
			}
		});
	}

	call();
	return canceller;
}

function clearAnimationFrameTimeout(canceller: Canceller) {
	if (canceller.id) cancelAnimationFrame(canceller.id);
}

type Canceller = {
	id?: number;
};
