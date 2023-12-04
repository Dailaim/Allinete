import { component$, useSignal } from "@builder.io/qwik";
import { Tab, TabList, TabPanel, Tabs } from "@qwik-ui/headless";

interface ImageGalleryProps {
	images: {
		id: number;
		name: string;
		src: string;
		alt: string;
	}[];
}

export const ImageGallery = component$<ImageGalleryProps>(({ images }) => {
	const selected = useSignal(0);
	return (
		<Tabs
			behavior="automatic"
			bind:selectedIndex={selected}
			class="flex flex-col-reverse"
			tabClass="mx-auto mt-6  w-full max-w-2xl sm:block lg:max-w-none"
			panelClass="aspect-h-1 aspect-w-1 w-full"
		>
			{/* Image selector */}
			<TabList class="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-6">
				{images.map((image, i) => (
					<Tab
						key={image.id}
						class="relative flex h-24 cursor-pointer ring-pink items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
					>
						<>
							<span class="sr-only">{image.name}</span>
							<span class="absolute inset-0 overflow-hidden rounded-md">
								<img
									src={image.src}
									alt=""
									class="h-full w-full rounded-md object-cover object-center"
								/>
							</span>
							<span
								class={[
									{
										"ring-pink": selected.value === i,
										"ring-transparent": selected.value !== i,
									},
									"pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
								]}
								aria-hidden="true"
							/>
						</>
					</Tab>
				))}
			</TabList>

			{images.map((image) => (
				<TabPanel key={image.id}>
					<img
						src={image.src}
						alt={image.alt}
						class="h-full w-full object-cover object-center rounded-lg"
					/>
				</TabPanel>
			))}
		</Tabs>
	);
});
