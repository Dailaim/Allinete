import type { Product } from "./types";

export const product: Product = {
	id: 1,
	name: "Zip Tote Basket",
	price: "$140",
	rating: 4,
	isWishlist: false,
	images: [
		{
			id: 1,
			name: "Angled view",
			src: "https://picsum.photos/578/579",
			alt: "Angled front view with bag zipped and handles upright.",
		},
		{
			id: 2,
			name: "Angled view",
			src: "https://picsum.photos/578/581",
			alt: "Angled front view with bag zipped and handles upright.",
		},
		{
			id: 3,
			name: "Angled view",
			src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
			alt: "Angled front view with bag zipped and handles upright.",
		},
		{
			id: 4,
			name: "Angled view",
			src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
			alt: "Angled front view with bag zipped and handles upright.",
		},
		{
			id: 5,
			name: "Angled view",
			src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
			alt: "Angled front view with bag zipped and handles upright.",
		},
		// More images...
	],
	colors: [
		{
			id: "afsdefsa",
			label: "Washed Black",
			bgColor: "#2c3e50",
		},
		{
			id: "fdafa",
			label: "White",
			bgColor: "#ffffff",
		},
		{
			id: "fasfdasfas",
			label: "Washed Gray",
			bgColor: "#7f8c8d",
		},
	],
	description:
		"The Zip Tote Basket is the perfect midpoint between a shopping tote and a comfy backpack. With convertible straps, you can hand-carry, shoulder sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keep your goods protected for all-day use.",
	details: [
		{
			name: "Features",
			items:
				"  - Multiple strap configurations\n  - Spacious interior with top zip\n  - Leather handle and tabs\n  - Interior dividers\n  - Stainless strap loops\n  - Double stitched construction\n  - Water-resistant",
		},
		{
			name: "Features2",
			items:
				"  - Multiple strap configurations\n  - Spacious interior with top zip\n  - Leather handle and tabs\n  - Interior dividers\n  - Stainless strap loops\n  - Double stitched construction\n  - Water-resistant",
		},
		{
			name: "Features1",
			items:
				"  - Multiple strap configurations\n  - Spacious interior with top zip\n  - Leather handle and tabs\n  - Interior dividers\n  - Stainless strap loops\n  - Double stitched construction\n  - Water-resistant",
		},
		// More sections...
	],
	ratingCount: 117,
};
