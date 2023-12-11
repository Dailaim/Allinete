import { $, type QwikTouchEvent, useSignal } from "@builder.io/qwik";
import type { navbarContext } from "./index";

export const useMenuTouch = (store: navbarContext) => {
	const startX = useSignal<number | null>(null);

	const handleTouchStart = $((e: QwikTouchEvent<HTMLElement>) => {
		startX.value = e.touches[0].clientX;
	});

	const handleTouchMove = $((e: QwikTouchEvent<HTMLElement>) => {
		if (!startX.value) return;

		const currentX = e.touches[0].clientX;

		const deltaX = currentX - startX.value;

		if (deltaX > 50) {
			if (store.openCart) {
				store.openCart = false;
				return;
			}

			if (!store.openMenu && !store.isTouchNavbar) return;
			store.openMenu = true;
		}

		if (deltaX < -50) {
			if (store.openMenu) {
				store.openMenu = false;
				return;
			}

			if (!store.openCart && !store.isTouchNavbar) return;
			store.openCart = true;
		}
	});

	const handleTouchEnd = $(() => {
		startX.value = null;
	});

	return {
		start: handleTouchStart,
		move: handleTouchMove,
		end: handleTouchEnd,
	};
};
