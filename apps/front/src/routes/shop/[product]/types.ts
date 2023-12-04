export interface Product {
	name: string;
	id: number | string;
	price: string;
	rating: number;
	images: {
		id: number;
		name: string;
		src: string;
		alt: string;
	}[];
	colors?: {
		id: string;
		label: string;
		bgColor: string;
	}[];
	description: string;
	details: {
		name: string;
		items: string;
	}[];
	isWishlist?: boolean;

	ratingCount?: number;
	userRating?: number;
}

export type SchemaForm = {
	id: string;
	color?: string;
};
