import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsKSR: InputSloyLayer = {
  id: "gorodets-ksr",
  title: "КСР",
  description: "Гостиницы, отели, хостелы и прочие места размещения туристов.",
  filters: [],
  visualizations: [
    {
      id: "gorodetsKSRFillLayer",
      source: "gorodetsKSRLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 1,
          "fill-color": "#ff00bb",
        },
      },
    },
    {
      id: "gorodetsKSRHeatmapLayer",
      source: "gorodetsKSRLayerSource",
      type: "map",
      mapLayerProps: {
        type: "heatmap",
        paint: {
          "heatmap-weight": {
            type: "exponential",
            property: "weight",
            stops: [
              [0, 0],
              [1, 1],
            ],
          },
          "heatmap-intensity": 1,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(255, 0, 187, 0.05)",
            0.2,
            "rgba(255, 0, 187, 0.1)",
            0.4,
            "rgba(255, 0, 187, 0.3)",
            0.6,
            "rgba(255, 0, 187, 0.5)",
            1,
            "rgb(255, 0, 187)",
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            15,
            MAX_ZOOM,
            10,
          ],
          "heatmap-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            1,
            MAX_ZOOM,
            0,
          ],
        },
      },
    },
  ],
};

export const gorodetsKSRSource: InputSloySource = {
  id: "gorodetsKSRLayerSource",
  path: "/gorodets-ksr.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: ["street", "housenumbe"],
    blocks: [],
  },
  copyright: [],
  properties: [],
};
