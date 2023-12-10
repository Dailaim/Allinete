import type {
	CSSProperties,
	PropFunction,
	QRL,
	Signal,
} from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";

import { Star } from "./star";

export const stopColorStyle = (color: string): CSSProperties => ({
	stopColor: color,
	stopOpacity: "1",
});

export const titleText = (
	rating: number,
	highestStarHovered: Signal<number>,
	typeOfWidget = "Star",
): string => {
	const currentRating =
		highestStarHovered.value > 0 ? highestStarHovered.value : rating;

	let formattedRating = parseFloat(currentRating.toFixed(2)).toString();

	if (Number.isInteger(currentRating)) {
		formattedRating = String(currentRating);
	}

	let starText = `${typeOfWidget}s`;

	if (formattedRating === "1") {
		starText = typeOfWidget;
	}

	return `${formattedRating} ${starText}`;
};

export const offsetValue = (rating: number): string => {
	const ratingIsInteger = Number.isInteger(rating);

	let offsetValue = "0%";

	if (!ratingIsInteger) {
		const firstTwoDecimals = rating.toFixed(2).split(".")[1].slice(0, 2);

		offsetValue = `${firstTwoDecimals}%`;
	}

	return offsetValue;
};

interface StarRatingsProps {
	numberOfStars?: number;
	changeRating$?: PropFunction<(rating: number, name?: string) => void>;

	starHoverColor?: string;
	starRatedColor?: string;
	starEmptyColor?: string;
	starDimension?: string;
	starSpacing?: string;
	gradientPathName?: string;
	ignoreInlineStyles?: boolean;
	svgIconPath?: string;
	svgIconViewBox?: string;
	rating: number;
	isSelectable?: boolean;
	name?: string;
}

export const RenderStars = component$<
	StarRatingsProps & {
		highestStarHovered: Signal<number>;
		unHoverOverStar$: QRL<() => void>;
		hoverOverStar$: QRL<(rating: number) => void>;
	}
>(
	({
		numberOfStars = 5,
		changeRating$ = undefined,
		rating,
		highestStarHovered,
		unHoverOverStar$,
		hoverOverStar$,
		name,
		...props
	}) => {
		const numberOfStarsArray = Array.from({ length: numberOfStars });

		return (
			<>
				{numberOfStarsArray.map((_, index) => {
					const fillId = `starGrad${Math.random().toFixed(15).slice(2)}`;
					const starRating = index + 1;
					const isStarred = starRating <= rating;

					const hoverMode = highestStarHovered.value > 0;
					const isHovered = starRating <= highestStarHovered.value;
					const isCurrentHoveredStar = starRating === highestStarHovered.value;

					const isPartiallyFullStar =
						starRating > rating && starRating - 1 < rating;

					const isFirstStar = starRating === 1;
					const isLastStar = starRating === numberOfStars;

					return (
						<Star
							isSelected={isStarred}
							key={starRating}
							fillId={fillId}
							changeRating$={() => changeRating$?.(starRating, name)}
							hoverOverStar$={() => {
								if (changeRating$) hoverOverStar$(starRating);
							}}
							unHoverOverStar$={changeRating$ ? unHoverOverStar$ : undefined}
							isStarred={isStarred}
							isPartiallyFullStar={isPartiallyFullStar}
							isHovered={isHovered}
							hoverMode={hoverMode}
							isCurrentHoveredStar={isCurrentHoveredStar}
							isFirstStar={isFirstStar}
							isLastStar={isLastStar}
							{...props}
						/>
					);
				})}
			</>
		);
	},
);

export const StarRatings = component$<
	StarRatingsProps & {
		typeOfWidget?: string;
	}
>(
	({
		rating = 0,
		typeOfWidget = "Star",
		numberOfStars = 5,
		changeRating$ = undefined,
		starHoverColor = "rgb(230, 67, 47)",
		starRatedColor = "rgb(109, 122, 130)",
		starEmptyColor = "rgb(203, 211, 227)",
		starDimension = "50px",
		starSpacing = "7px",
		gradientPathName = "",
		ignoreInlineStyles = false,
		svgIconPath = "m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z",
		svgIconViewBox = "0 0 51 48",
		...props
	}) => {
		const highestStarHovered = useSignal<number>(-Infinity);
		const fillId = `starGrad${Math.random().toFixed(15).slice(2)}`;

		const starRatingsStyle: CSSProperties = {
			position: "relative",
			boxSizing: "border-box",
			display: "inline-block",
		};

		const starGradientStyle: CSSProperties = {
			position: "absolute",
			zIndex: 0,
			width: 0,
			height: 0,
			visibility: "hidden",
		};

		return (
			<div
				class="star-ratings"
				title={titleText(rating, highestStarHovered, typeOfWidget)}
				style={starRatingsStyle}
			>
				<svg role="button" class="star-grad" style={starGradientStyle}>
					<defs>
						<linearGradient id={fillId} x1="0%" y1="0%" x2="100%" y2="0%">
							<stop
								offset="0%"
								class="stop-color-first"
								style={stopColorStyle(starRatedColor)}
							/>
							<stop
								offset={offsetValue(rating)}
								class="stop-color-first"
								style={stopColorStyle(starRatedColor)}
							/>
							<stop
								offset={offsetValue(rating)}
								class="stop-color-final"
								style={stopColorStyle(starEmptyColor)}
							/>
							<stop
								offset="100%"
								class="stop-color-final"
								style={stopColorStyle(starEmptyColor)}
							/>
						</linearGradient>
					</defs>
				</svg>
				<RenderStars
					numberOfStars={numberOfStars}
					changeRating$={changeRating$}
					starHoverColor={starHoverColor}
					starRatedColor={starRatedColor}
					starEmptyColor={starEmptyColor}
					starDimension={starDimension}
					starSpacing={starSpacing}
					gradientPathName={gradientPathName}
					ignoreInlineStyles={ignoreInlineStyles}
					svgIconPath={svgIconPath}
					svgIconViewBox={svgIconViewBox}
					rating={rating}
					highestStarHovered={highestStarHovered}
					unHoverOverStar$={() => {
						highestStarHovered.value = -Infinity;
					}}
					hoverOverStar$={(hoveredRating: number): void => {
						highestStarHovered.value = hoveredRating;
					}}
					{...props}
				/>
			</div>
		);
	},
);
