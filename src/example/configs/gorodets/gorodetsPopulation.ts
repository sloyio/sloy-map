import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsPopulation: InputSloyLayer = {
  id: "gorodets-population",
  title: "Плотность населения",
  filters: [],
  visualizations: [
    {
      id: "gorodetsPopulationLineLayer",
      source: "gorodetsPopulationLayerSource",
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "#00eeff",
        },
      },
    },
    {
      id: "gorodetsPopulationFillLayer",
      source: "gorodetsPopulationLayerSource",
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.3,
          "fill-color": "#00eeff",
        },
      },
    },
  ],
};

export const gorodetsPopulationSource: InputSloySource = {
  id: "gorodetsPopulationLayerSource",
  path: "/gorodets-population-hex.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "NAME",
    blocks: [],
  },
  copyright: [],
  properties: [],
};
