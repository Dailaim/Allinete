import type { QwikTouchEvent, Signal } from "@builder.io/qwik";
import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Motion } from "~/packages/motion";
import { ButtonText } from "../button";
import {
	SVGAccountWithName,
	SVGCartWithName,
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

  useVisibleTask$(({track})=>{
    track(()=>MenuSig.value)
    track(()=>CartSig.value)

    if (MenuSig.value || CartSig.value) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    if (!MenuSig.value && !CartSig.value) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

  })

	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useMenuTouch(
		MenuSig,
		CartSig,
	);

	return (
    <>
    <span class="overflow-x-hidden ">
			<MenuMobile MenuSig={MenuSig} />
      <CartMobile MenuSig={CartSig} />
    </span>
			<div
				onTouchStart$={handleTouchStart}
				onTouchMove$={handleTouchMove}
				onTouchEnd$={handleTouchEnd}
				class="lg:hidden flex overflow-x-hidden max-w-[100vw] px-5 py-2.5 fixed bottom-0 w-full bg-white shadow-md shadow-black sh select-none"
			>
				<div class="container mx-auto items-center justify-around w-full flex">
					<SVGMenuWithName
						class=""
						onClick$={() => {
              if (CartSig.value) {
                CartSig.value = false;
              }
              MenuSig.value = !MenuSig.value;
              
						}}
					/>

					<Link href="/" class="text-2xl font-medium text-pink">
						Alinette
					</Link>
					<span>
						<SVGCartWithName
              onClick$={() => {
              if (MenuSig.value) {
                MenuSig.value = false;
              }
                CartSig.value = !CartSig.value;
              }
              }
            class=" hover:text-pink" />
					</span>
				</div>
			</div>
     
		</>
	);
});

export const CartMobile = component$<{
	MenuSig: Signal<boolean>;
}>(({ MenuSig }) => {
	const { handleTouchStart, handleTouchMove, handleTouchEnd } =
		useMenuTouch(undefined, MenuSig);


	return (
    <Motion.div
      onTouchStart$={handleTouchStart}
      onTouchMove$={handleTouchMove}
      onTouchEnd$={handleTouchEnd}
      class={{
        "fixed -z-10 flex h-screen w-screen flex-col justify-start bg-white lg:hidden":
          true,
      }}
      initial={{
        transform: "translateX(100%)",

      }}
      animate={{
        transform: MenuSig.value ? "translateX(0)" : "translateX(100%)",

      }}
    >
      <div class="flex w-full select-none items-center justify-between bg-pink px-5 py-4 uppercase text-white">
        <h2 class="text-2xl font-semibold">Cart</h2>

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

export const MenuMobile = component$<{
	MenuSig: Signal<boolean>;
}>(({ MenuSig }) => {
	const { handleTouchStart, handleTouchMove, handleTouchEnd } =
		useMenuTouch(MenuSig);

	return (
		<Motion.div
			onTouchStart$={handleTouchStart}
			onTouchMove$={handleTouchMove}
			onTouchEnd$={handleTouchEnd}
			class="fixed w-screen h-screen bg-white flex flex-col justify-start lg:hidden"

      initial={{
        transform: "translateX(-100%)",
      }}

			animate={{
				transform: MenuSig.value ? ["translateX(-100%)","translateX(0)"] : "translateX(-100%)",
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
