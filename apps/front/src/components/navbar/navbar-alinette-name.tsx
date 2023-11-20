import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Motion } from "~/packages/motion";
import { LayoutSVGWithName } from "../icons/layoutSvgWithName";

export const NavbarAlinetteName = component$(() => {
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
					transition={{
						height: {
							duration: 0.3,
						},
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
