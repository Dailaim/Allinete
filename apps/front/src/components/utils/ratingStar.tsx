import type { HtmlHTMLAttributes, QRL } from "@builder.io/qwik";
import { $, component$, useId, useSignal } from "@builder.io/qwik";
import { SVGStar } from "../icons";
import type { SVGProps } from "../icons/props";

type Actions = {
	ratingValue: number;
	tmp: number;
	value: number;
	onHoverFunc: QRL<(hoveredRating: number) => void>;
};

export const Actions = ({ ratingValue, tmp, value, onHoverFunc }: Actions) => {
	const isHovered = ratingValue <= tmp;
	const isSelected = ratingValue <= value;
	const isPrev = !isHovered && isSelected && tmp > 0;

	const onHover = $(() => {
		onHoverFunc(ratingValue);
	});

	return {
		isHovered,
		isSelected,
		isPrev,
		onHover,
	};
};

export const useRating = ({ numberOfStars = 5 }) => {
	const id = useId();
	const tmp = useSignal<number>(-Infinity);

	const unHover = $(() => {
		tmp.value = -Infinity;
	});

	const onHoverFunc = $((hoveredRating: number) => {
		tmp.value = hoveredRating;
	});

	const ratings = Array.from(
		{ length: numberOfStars },
		(_, index) => index + 1,
	);

	return {
		ratings,
		tmp: tmp.value,
		onHoverFunc,
		unHover,
		id,
	};
};

export type RatingStarProps = HtmlHTMLAttributes<HTMLElement> & {
	rating: number;
	numberOfStars?: number;
	changeRating$?: QRL<(rating: number, name?: string) => void> | undefined;
	StarProps?: Omit<SVGProps, "onClick$" | "onMouseEnter$" | "onMouseLeave$">;
	defaultRating?: number;
};

export const RatingStar = component$<RatingStarProps>(
	({
		rating,
		changeRating$,
		numberOfStars = 5,
		class: ClassName,
		StarProps,
		...props
	}) => {
		const { ratings, id, onHoverFunc, tmp, unHover } = useRating({
			numberOfStars,
		});
		return (
			<div
				class={[
					"inline-flex",
					//@ts-ignore
					ClassName,
				]}
				{...props}
			>
				{ratings.map((starRating) => {
					const { isHovered, isSelected, isPrev, onHover } = Actions({
						ratingValue: starRating,
						tmp,
						value: rating,
						onHoverFunc,
					});
					return (
						<SVGStar
							{...StarProps}
							key={`Start${starRating}${id}`}
							onMouseEnter$={onHover}
							onMouseLeave$={unHover}
							onClick$={$(() => changeRating$?.(starRating))}
							underline={isPrev}
							class={[
								"cursor-pointer text-3xl",
								"select-none",
								"text-gray",
								//@ts-ignore
								{
									"!text-pink": isHovered || isSelected,
								},
								//@ts-ignore
								StarProps?.class,
							]}
						/>
					);
				})}
			</div>
		);
	},
);
