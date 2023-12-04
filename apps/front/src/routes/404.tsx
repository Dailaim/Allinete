import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Image404 from "~/img/res/404.png?jsx";

export default component$(() => {
	return (
		<>
			<main class="relative isolate h-screen w-screen mx-auto">
				<div class="overflow-hidden h-full max-h-screen">
					<Image404 alt="404" class="object-cover w-full h-full" />
				</div>

				<div class="absolute left-0 top-0 w-full h-full mx-auto flex flex-col justify-center px-3 md:px-6 md:py-32 text-center sm:py-40 lg:px-8">
					<div class="card md:w-96 glass mx-auto">
						<div class="card-body  items-center text-center">
							<h2 class="card-title text-accent-focus text-3xl ">
								Page not found
							</h2>
							<p>Sorry, we couldn’t find the page you’re looking for.</p>
							<Link
								href="/"
								class="text-sm font-semibold leading-7 text-primary"
							>
								<span aria-hidden="true">&larr;</span> Back to home
							</Link>
						</div>
					</div>
				</div>
			</main>
		</>
	);
});
