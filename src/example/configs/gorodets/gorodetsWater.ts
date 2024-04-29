import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsWater: InputSloyLayer = {
  id: "gorodets-water",
  title: "Вода",
  filters: [],
  visualizations: [
    {
      id: "gorodetsWaterLineLayer",
      source: "gorodetsWaterLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "#0033ff",
        },
      },
    },
    {
      id: "gorodetsWaterFillLayer",
      source: "gorodetsWaterLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.5,
          "fill-color": "#0033ff",
        },
      },
    },
  ],
};

export const gorodetsWaterSource: InputSloySource = {
  id: "gorodetsWaterLayerSource",
  path: "/gorodets-water.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "name",
    blocks: [],
  },
  copyright: [],
  properties: [],
};
