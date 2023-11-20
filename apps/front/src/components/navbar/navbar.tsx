import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useNavbarContext } from "~/context/navbar";
import { Motion } from "~/packages/motion";
import { ButtonText } from "../button";
import {
	SVGAccountWithName,
	SVGCartWithName,
	SVGMenuWithName,
	SVGSearchWithName,
} from "../icons";
import { LayoutSVGWithName } from "../icons/layoutSvgWithName";

export const Navbar = component$(() => {
	return (
		<header class="bg-white sticky top-0 z-50 shadow-sm select-none ">
			<NavbarMobile />
			<NavbarDesktop />
		</header>
	);
});

export const NavbarMobile = component$(() => {
	const store = useNavbarContext();

	useVisibleTask$(({ track }) => {
		track(() => store.isOpen);

		if (store.isOpen) {
			document.body.style.overflow = "hidden";
			document.body.style.height = "100vh";
			return;
		}

		document.body.style.overflow = "auto";
		document.body.style.height = "auto";
	});

	return (
		<>
			<span class="overflow-x-hidden ">
				<MenuMobile />
				<CartMobile />
			</span>
			<div
				onTouchStart$={(e) => {
					store.isTouchNavbar = true;
					store.touchHandler.start(e);
				}}
				onTouchMove$={store.touchHandler.move}
				onTouchEnd$={(e) => {
					store.touchHandler.end(e);
					store.isTouchNavbar = false;
				}}
				class="sh fixed bottom-0 flex w-full drop-shadow-2xl max-w-[100vw] select-none overflow-x-hidden bg-white px-5 py-2.5 shadow-md shadow-black lg:hidden"
			>
				<div class="container mx-auto flex w-full items-center justify-around">
					<SVGMenuWithName
						class=""
						onClick$={() => {
							if (store.openCart) {
								store.openCart = false;
							}
							store.openMenu = !store.openMenu;
						}}
					/>
					<NavbarAlinetteName />
					<span>
						<SVGCartWithName
							onClick$={() => {
								if (store.openMenu) {
									store.openMenu = false;
								}
								store.openCart = !store.openCart;
							}}
							class=" hover:text-pink"
						/>
					</span>
				</div>
			</div>
		</>
	);
});

const NavbarAlinetteName = component$(() => {
	const loc = useLocation();
	return (
		<Link href="/" class="flex flex-col h-[44px] justify-center items-center">
			<LayoutSVGWithName
				class={[
					"transition-all",
					{
						"font-medium text-pink": loc.url.pathname === "/",
					},
				]}
				name=""
			>
				<Motion.svg
					initial={{
						opacity: loc.url.pathname !== "/" ? 1 : 0,
						height: loc.url.pathname !== "/" ? "1.5rem" : 0,
						transform:
							loc.url.pathname !== "/" ? "translateY(0%)" : "translateY(100%)",
					}}
					animate={{
						display: loc.url.pathname !== "/" ? "block" : "none",
						height: loc.url.pathname !== "/" ? "1.5rem" : 0,
						opacity: loc.url.pathname !== "/" ? 1 : 0,
						transform:
							loc.url.pathname !== "/" ? "translateY(0%)" : "translateY(100%)",
					}}
					role="figure"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</Motion.svg>

				<Motion.h3
					initial={{
						fontSize: loc.url.pathname === "/" ? "1.5rem" : "0.875rem",
					}}
					animate={{
						fontSize: loc.url.pathname === "/" ? "1.5rem" : "0.875rem",
					}}
					transition={{
						delay: 0.3,
					}}
				>
					Alinette
				</Motion.h3>
			</LayoutSVGWithName>
		</Link>
	);
});

export const CartMobile = component$(() => {
	const store = useNavbarContext();

	return (
		<Motion.div
			onTouchStart$={store.touchHandler.start}
			onTouchMove$={store.touchHandler.move}
			onTouchEnd$={store.touchHandler.end}
			class={{
				"fixed -z-10 flex h-screen w-screen flex-col justify-start bg-white lg:hidden": true,
			}}
			initial={{
				transform: "translateX(100%)",
			}}
			animate={{
				transform: store.openCart ? "translateX(0)" : "translateX(100%)",
			}}
		>
			<div class="flex w-full select-none items-center justify-between bg-pink px-5 py-4 uppercase text-white">
				<h2 class="text-2xl font-semibold">Cart</h2>

				<div
					class="cursor-pointer pl-10 "
					onClick$={() => {
						store.openCart = false;
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
					store.openCart = false;
				}}
				class="flex  w-full flex-col justify-start gap-5 px-5 py-6 uppercase"
			>
				<SVGSearchWithName noTextSize row class="gap-1 text-lg" />

				<SVGAccountWithName noTextSize row class="gap-1 text-lg" />

				<Link class="text-lg hover:text-pink">Shop all</Link>
				<Link class="text-lg hover:text-pink">BESTSELLERS</Link>
				<Link class="text-lg hover:text-pink">COLLECTION</Link>
				<Link class="text-lg hover:text-pink">ABOUT US</Link>
			</div>
		</Motion.div>
	);
});

export const MenuMobile = component$(() => {
	const store = useNavbarContext();

	return (
		<Motion.div
			onTouchStart$={store.touchHandler.start}
			onTouchMove$={store.touchHandler.move}
			onTouchEnd$={store.touchHandler.end}
			class="fixed w-screen h-screen bg-white flex flex-col justify-start lg:hidden"
			initial={{
				transform: "translateX(-100%)",
			}}
			animate={{
				transform: store.openMenu
					? ["translateX(-100%)", "translateX(0)"]
					: "translateX(-100%)",
			}}
		>
			<div class="w-full bg-pink flex px-5 py-4 text-white uppercase justify-between items-center select-none">
				<h2 class="font-semibold text-2xl">Menu</h2>

				<div
					class="cursor-pointer pl-10 "
					onClick$={() => {
						store.openMenu = false;
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
					store.openMenu = false;
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
		</Motion.div>
	);
});

export const NavbarDesktop = component$(() => {
	return (
		<div class="hidden px-5 2xl:px-0 justify-between items-center container py-4 lg:flex mx-auto  uppercase">
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
