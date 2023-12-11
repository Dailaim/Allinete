import type { CSSProperties, PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { SVGProps } from "~/components/icons/props";

type StarProps = SVGProps & {
	fillId: string;
	changeRating$?: PropFunction<() => void>;
	hoverOverStar$?: PropFunction<() => void>;
	unHoverOverStar$?: PropFunction<() => void>;
	isStarred?: boolean;
	isSelected?: boolean;
	isPartiallyFullStar?: boolean;
	isHovered?: boolean;
	hoverMode?: boolean;
	isCurrentHoveredStar?: boolean;
	isFirstStar?: boolean;
	isLastStar?: boolean;
	starDimension?: string;
	starSpacing?: string;
	starHoverColor?: string;
	starRatedColor?: string;
	starEmptyColor?: string;
	gradientPathName?: string;
	ignoreInlineStyles?: boolean;
	svgIconPath?: string;
	svgIconViewBox?: string;
};

export const Star = component$<StarProps>(
	({
		changeRating$,
		hoverOverStar$,
		unHoverOverStar$,
		svgIconViewBox,
		svgIconPath,
		...props
	}) => {
		const starContainerStyle: CSSProperties = {
			position: "relative",
			display: "inline-block",
			verticalAlign: "middle",
			paddingLeft: props.isFirstStar ? undefined : props.starSpacing,
			paddingRight: props.isLastStar ? undefined : props.starSpacing,
			cursor: changeRating$ ? "pointer" : undefined,
		};

		const starSvgStyle: CSSProperties = {
			width: props.starDimension,
			height: props.starDimension,
			transition: "transform .2s ease-in-out",
			transform: props.isCurrentHoveredStar ? "scale(1.1)" : undefined,
		};

		const pathStyle: CSSProperties = {
			/* fill: props.ignoreInlineStyles ? undefined : props.pathStyle.fill, */
			transition: "fill .2s ease-in-out",
		};

		const fill =
			props.hoverMode && props.isHovered
				? props.starHoverColor
				: props.isPartiallyFullStar
				  ? `url('${props.gradientPathName}#${props.fillId}')`
				  : props.isStarred
					  ? props.starRatedColor
					  : props.starEmptyColor;

		pathStyle.fill = fill;

		return (
			<div
				class="star-container"
				style={props.ignoreInlineStyles ? {} : starContainerStyle}
				// eslint-disable-next-line qwik/valid-lexical-scope
				onMouseEnter$={hoverOverStar$}
				// eslint-disable-next-line qwik/valid-lexical-scope
				onMouseLeave$={unHoverOverStar$}
				// eslint-disable-next-line qwik/valid-lexical-scope
				onClick$={changeRating$}
			>
				<svg
					role="button"
					viewBox={svgIconViewBox}
					class={{
						"widget-svg": true,
						"widget-selected": props.isSelected,
						"multi-widget-selected": props.isPartiallyFullStar,
						hovered: props.isHovered,
						"current-hovered": props.isCurrentHoveredStar,
					}}
					style={props.ignoreInlineStyles ? {} : starSvgStyle}
				>
					<path
						class="star"
						style={props.ignoreInlineStyles ? {} : pathStyle}
						d={svgIconPath}
					/>
				</svg>
			</div>
		);
	},
);
