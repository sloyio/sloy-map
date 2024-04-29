import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsPopulationPPL: InputSloyLayer = {
  id: "gorodets-population-ppl",
  title: "Плотность населения",
  filters: [
    {
      type: "range",
      filterVisualizations: ["gorodetsPopulationPPLPointsLayer"],
      source: "gorodetsPopulationPPLLayerSource",
      property: "total_ppl",
    },
  ],
  visualizations: [
    {
      id: "gorodetsPopulationPPLPointsLayer",
      source: "gorodetsPopulationPPLLayerSource",
      openable: true,
      type: "map",
      property: "total_ppl",
      mapLayerProps: {
        type: "circle",
        paint: {
          "circle-stroke-width": 1,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            0,
            MAX_ZOOM,
            5,
          ],
        },
      },
    },
    {
      id: "gorodetsPopulationPPLHeatmapLayer",
      source: "gorodetsPopulationPPLLayerSource",
      type: "map",
      property: "total_ppl",
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
            "rgba(0, 0, 255, 0)",
            0.2,
            "rgb(0, 255, 0)",
            0.4,
            "rgb(255, 255, 0)",
            0.6,
            "rgb(255, 0, 0)",
            1,
            "rgb(255, 0, 0)",
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            0,
            MAX_ZOOM,
            25,
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

export const gorodetsPopulationPPLSource: InputSloySource = {
  id: "gorodetsPopulationPPLLayerSource",
  path: "/gorodets-population-ppl.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "address",
    blocks: [
      { type: "value", id: "total_ppl" },
      { type: "value", id: "age" },
      { type: "value", id: "floors" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "total_ppl",
      title: "Количество жителей",
      range: [
        { from: 0, to: 2, value: 3370, color: "#00438a" },
        { from: 3, to: 5, value: 669, color: "#4c3ab5" },
        { from: 6, to: 8, value: 189, color: "#7f21cc" },
        { from: 9, to: 13, value: 88, color: "#a500c6" },
        { from: 14, to: 20, value: 66, color: "#c600ac" },
        { from: 21, to: 30, value: 75, color: "#ea006a" },
        { from: 31, to: 501, value: 174, color: "#ff0000" },
      ],
    },
    {
      id: "age",
      title: "Возраст здания",
    },
    {
      id: "floors",
      title: "Количество этажей",
    },
  ],
};
