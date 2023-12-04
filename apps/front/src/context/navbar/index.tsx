import type { QRL, QwikTouchEvent } from "@builder.io/qwik";
import {
	Slot,
	component$,
	createContextId,
	useContext,
	useContextProvider,
	useStore,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik";
import { useScrollContext } from "../scroll";
import { useMenuTouch } from "./useMenuTouch";

export type navbarContext = {
	openMenu: boolean;
	openCart: boolean;
	openSearch: boolean;
	isOpen: boolean;
	openCustoms: boolean;
	touchHandler: {
		start: QRL<(this: navbarContext, e: QwikTouchEvent) => void>;
		move: QRL<(this: navbarContext, e: QwikTouchEvent) => void>;
		end: QRL<(this: navbarContext, e: QwikTouchEvent) => void>;
	};
	isTouchNavbar: boolean;
};

export const navbarContext = createContextId<navbarContext>("navbar-context");

export const useNavbarContext = () => {
	return useContext(navbarContext);
};

export const NavbarProvider = component$(() => {
	const store = useStore<navbarContext>(
		{
			openMenu: false,
			openCart: false,
			openSearch: false,
			openCustoms: false,
			touchHandler: {} as any,
			isOpen: false,
			isTouchNavbar: false,
		},
		{
			deep: true,
		},
	);

	const touchHandlers = useMenuTouch(store);

	const scroll = useScrollContext();

	useTask$(() => {
		store.touchHandler = touchHandlers;
	});

	useVisibleTask$(({ track }) => {
		track(() => store.openMenu || store.openCart || store.openSearch);

		const result = store.openMenu || store.openCart || store.openSearch;

		store.isOpen = result;

		scroll.value = !result;
	});

	useContextProvider(navbarContext, store);

	return <Slot />;
});
