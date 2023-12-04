import { createContextId, useContext } from "@builder.io/qwik";
import type { Product } from "./types";

export const productContext = createContextId<Product>(
	"value-product-article-id",
);

export const useProductCtx = () => useContext(productContext);
