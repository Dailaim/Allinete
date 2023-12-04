import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { OptionColor } from "./option-color";

import { useForm } from "@modular-forms/qwik";

import { ButtonAddToWishList } from "./add-to-wish-list";
import { handlerAddToBag } from "./handler-add-to-bag";
import type { Product, SchemaForm } from "./types";

interface Props {
	product: Product;
}

export const FormToBag = component$<Props>(({ product }) => {
	const [, { Form, Field }] = useForm<SchemaForm>({
		loader: {
			value: {
				id: product.id as string,
				color: product.colors?.[0].id,
			},
		},
	});

	return (
		<Form onSubmit$={handlerAddToBag} class="mt-6">
			{/* Colors */}
			{product.colors && (
				<Field name="color" type="string">
					{(field, props) => (
						<div>
							<h3 class="text-sm text-gray-600">Color</h3>

							<div class="mt-2">
								<label class="sr-only">Choose a color</label>
								<span class="flex items-center space-x-4">
									{product.colors?.map((color) => (
										<OptionColor
											{...props}
											isChecked={color.id === field.value}
											value={color.id}
											bgColor={color.bgColor}
											nameColor={color.label}
											key={`${color.id}-${color.label} color`}
										/>
									))}
								</span>
							</div>
						</div>
					)}
				</Field>
			)}

			<Field name="id" type="string">
				{(field, props) => (
					<input {...props} class="sr-only" name="id" value={product.id} />
				)}
			</Field>

			<div class="mt-10 grid md:grid-rows-1 md:grid-cols-5 grid-cols-1 grid-rows-2  gap-5">
				<Button
					type="submit"
					variant="primary"
					class="flex col-span-3 flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-whit sm:w-full"
				>
					Add to bag
				</Button>

				<ButtonAddToWishList />
			</div>
		</Form>
	);
});
