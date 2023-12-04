import { component$ } from "@builder.io/qwik";

import {
	AccordionContent,
	AccordionHeader,
	AccordionItem,
	AccordionRoot,
	AccordionTrigger,
} from "@qwik-ui/headless";
import { TbMinus, TbPlus } from "@qwikest/icons/tablericons";

interface AdditionalDetailsProps {
	details: { name: string; items: string }[];
}

export const AdditionalDetails = component$<AdditionalDetailsProps>(
	({ details }) => {
		return (
			<section aria-labelledby="details-heading" class="mt-12">
				<h2 id="details-heading" class="sr-only">
					Additional details
				</h2>

				<AccordionRoot class="divide-y divide-gray border-gray border-t">
					{details.map((detail, i) => (
						<AccordionItem defaultValue={i === 0} key={detail.name}>
							<AccordionHeader as="h3">
								<AccordionTrigger class="group flex w-full items-center justify-between py-6 text-left">
									<span class="group-aria-expanded:text-green-400 text-gray-9  font-medium">
										{detail.name}
									</span>
									<span class="flex items-center">
										<TbMinus class="text-purple w-5 h-5 duration-500 group-aria-expanded:hidden" />
										<TbPlus
											class="hidden group-aria-expanded:block w-5 h-5 text-purple"
											aria-hidden="true"
										/>
									</span>
								</AccordionTrigger>
							</AccordionHeader>

							<AccordionContent class="accordion-animation-1 overflow-hidden prose prose-sm pb-6">
								<span dangerouslySetInnerHTML={detail.items} />
							</AccordionContent>
						</AccordionItem>
					))}
				</AccordionRoot>
			</section>
		);
	},
);
