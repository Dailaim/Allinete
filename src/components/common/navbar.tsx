import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { SiInstagram } from "@qwikest/icons/simpleicons";
import { InstagramLink } from "~/utils/conts";

export const Navbar = component$(() => {
	return (
		<header id="website-header" class=" bg-neutral sticky top-0 z-50">
			<div class=" navbar bg-neutral text-neutral-content container mx-auto">
				<div class="flex-1">
					<Link href="/" class="btn btn-ghost normal-case text-xl title">
						Alinette
					</Link>
				</div>

				<div class="flex-none">
					<a
						href={InstagramLink}
						class="btn btn-ghost btn-square"
						target="_blank"
						rel="noopener noreferrer"
					>
						<SiInstagram class="w-6 h-6" />
					</a>
					<button type="button" class="btn btn-ghost">
						Contact
					</button>
				</div>
			</div>
		</header>
	);
});
