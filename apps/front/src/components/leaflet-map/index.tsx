import type { HtmlHTMLAttributes } from "@builder.io/qwik";
import {
	component$,
	noSerialize,
	useSignal,
	// useStyles$,
	useVisibleTask$,
} from "@builder.io/qwik";
import { Map as LFMap } from "leaflet";
import type { MapProps } from "~/models/map";

// import leafletStyles from "../../../node_modules/leaflet/dist/leaflet.css?inline";

import { getBoundaryBox } from "~/utils/boundary-box";

import { marker, tileLayer } from "leaflet";

export const LeafletMap = component$<
	MapProps & HtmlHTMLAttributes<HTMLElement>
>(({ location, ...props }) => {
	// useStyles$(leafletStyles);
	const mapContainer$ = useSignal<LFMap>();

	useVisibleTask$(async ({ track }) => {
		track(location);

		if (mapContainer$.value) {
			mapContainer$.value.remove();
		}

		const { value: locationData } = location;

		const centerPosition: [number, number] = locationData.point as [
			number,
			number,
		];

		const map: LFMap = new LFMap("map").setView(
			centerPosition,
			locationData.zoom || 14,
		);

		tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		// Assign select boundary box to use in OSM API if you want
		locationData.boundaryBox = getBoundaryBox(map);

		locationData.marker &&
			marker(centerPosition).bindPopup("Soraluze (Gipuzkoa) :)").addTo(map);

		mapContainer$.value = noSerialize(map);
	});
	return <div {...props} id="map" />;
});
