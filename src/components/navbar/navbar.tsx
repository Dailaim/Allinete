import { on } from "events";
import {
	$,
	QwikTouchEvent,
	Signal,
	component$,
	useOnWindow,
	useSignal,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { InMenu } from "@qwikest/icons/iconoir";
import { ButtonText } from "../button";
import {
	SVGAccountWithName,
	SVGCart,
	SVGCartWithName,
	SVGMenu,
	SVGMenuWithName,
	SVGSearchWithName,
} from "../icons";

export const Navbar = component$(() => {
	return (
		<header class="bg-white sticky top-0 z-50 shadow-sm select-none ">
			<NavbarMobile />

			<NavbarDesktop />
		</header>
	);
});

const useMenuTouch = (
	MenuLeft?: Signal<boolean>,
	MenuRight?: Signal<boolean>,
) => {
	const startX = useSignal<number | null>(null);

	const handleTouchStart = $((e: QwikTouchEvent<HTMLElement>) => {
		startX.value = e.touches[0].clientX;
	});

	const handleTouchMove = $((e: QwikTouchEvent<HTMLElement>) => {
		if (!startX.value) return;

		const currentX = e.touches[0].clientX;
		const deltaX = currentX - startX.value;

		if (deltaX > 50) {
			if (MenuRight?.value) {
				MenuRight.value = false;
				return;
			}

			if (!MenuLeft) return;
			MenuLeft.value = true;
		}

		if (deltaX < -50) {
			if (MenuLeft?.value) {
				MenuLeft.value = false;
				return;
			}

			if (!MenuRight) return;
			MenuRight.value = true;
		}
	});

	const handleTouchEnd = $(() => {
		startX.value = null;
	});

	return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

export const NavbarMobile = component$(() => {
	const MenuSig = useSignal(false);

	const CartSig = useSignal(false);

	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useMenuTouch(
		MenuSig,
		CartSig,
	);

	return (
		<>
			<MenuMobile MenuSig={MenuSig} />
			<div
				onTouchStart$={handleTouchStart}
				onTouchMove$={handleTouchMove}
				onTouchEnd$={handleTouchEnd}
				class="lg:hidden flex  px-5 py-2.5 fixed bottom-0 w-full bg-white shadow-md shadow-black sh select-none"
			>
				<div class="container mx-auto items-center justify-around w-full flex">
					<SVGMenuWithName
						class=""
						onClick$={() => {
							MenuSig.value = !MenuSig.value;
						}}
					/>

					<Link href="/" class="text-2xl font-medium text-pink">
						Alinette
					</Link>
					<span>
						<SVGCartWithName class=" hover:text-pink" />
					</span>
				</div>
			</div>
		</>
	);
});

export const MenuMobile = component$<{
	MenuSig: Signal<boolean>;
}>(({ MenuSig }) => {
	const { handleTouchStart, handleTouchMove, handleTouchEnd } =
		useMenuTouch(MenuSig);

	return (
		<div
			onTouchStart$={handleTouchStart}
			onTouchMove$={handleTouchMove}
			onTouchEnd$={handleTouchEnd}
			class="absolute w-screen h-screen bg-white flex flex-col justify-start"
			style={{
				transform: MenuSig.value ? "translateX(0)" : "translateX(-100%)",
				transition: "transform 0.3s ease-in-out",
			}}
		>
			<div class="w-full bg-pink flex px-5 py-4 text-white uppercase justify-between items-center select-none">
				<h2 class="font-semibold text-2xl">Menu</h2>

				<div
					class="cursor-pointer pl-10 "
					onClick$={() => {
						MenuSig.value = false;
					}}
				>
					<svg
						class="inline"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
					>
						<path
							d="M14.9966 1.00613L1.0083 14.9915"
							stroke="white"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M15 15L1 1"
							stroke="white"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			</div>
			<div
				onClick$={() => {
					MenuSig.value = false;
				}}
				class="w-full  flex flex-col justify-start px-5 py-6 uppercase gap-5"
			>
				<SVGSearchWithName noTextSize row class="gap-1 text-lg" />

				<SVGAccountWithName noTextSize row class="gap-1 text-lg" />

				<Link class="hover:text-pink text-lg">Shop all</Link>
				<Link class="hover:text-pink text-lg">BESTSELLERS</Link>
				<Link class="hover:text-pink text-lg">COLLECTION</Link>
				<Link class="hover:text-pink text-lg">ABOUT US</Link>
			</div>
		</div>
	);
});

export const NavbarDesktop = component$(() => {
	return (
		<div class="hidden  justify-between items-center container py-4 lg:flex mx-auto  uppercase">
			<Link href="/" class="text-2xl font-medium text-pink">
				Alinette
			</Link>
			<div class="flex gap-10 uppercase">
				<ButtonText class="uppercase">Shop all</ButtonText>
				<ButtonText class="uppercase">BESTSELLERS</ButtonText>
				<ButtonText class="uppercase">COLLECTION</ButtonText>
				<ButtonText class="uppercase">ABOUT US</ButtonText>
			</div>
			<div class="gap-5 flex">
				<span>
					<SVGSearchWithName class="gap-1" />
				</span>
				<span>
					<SVGAccountWithName class="gap-1" />
				</span>
				<span>
					<SVGCartWithName class="gap-1" />
				</span>
			</div>
		</div>
	);
});
