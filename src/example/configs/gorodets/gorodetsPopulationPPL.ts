import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsPopulationPPL: InputSloyLayer = {
  id: "gorodets-population-ppl",
  title: "Количество жителей",
  filters: [
    {
      type: "range",
      filterVisualizations: [
        "gorodetsPopulationPPLPointsLayer",
        "gorodetsPopulationPPLHeatmapLayer",
      ],
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
            6,
          ],
        },
      },
    },
    // {
    //   id: "gorodetsPopulationPPLHeatmapLayer",
    //   source: "gorodetsPopulationPPLLayerSource",
    //   type: "map",
    //   property: "total_ppl",
    //   mapLayerProps: {
    //     type: "heatmap",
    //     paint: {
    //       "heatmap-weight": {
    //         type: "exponential",
    //         property: "weight",
    //         stops: [
    //           [0, 0],
    //           [1, 1],
    //         ],
    //       },
    //       "heatmap-intensity": 1,
    //       "heatmap-color": [
    //         "interpolate",
    //         ["linear"],
    //         ["heatmap-density"],
    //         0,
    //         "rgba(0, 0, 255, 0)",
    //         0.2,
    //         "rgb(0, 255, 0)",
    //         0.4,
    //         "rgb(255, 255, 0)",
    //         0.6,
    //         "rgb(255, 0, 0)",
    //         1,
    //         "rgb(255, 0, 0)",
    //       ],
    //       "heatmap-radius": [
    //         "interpolate",
    //         ["linear"],
    //         ["zoom"],
    //         MIN_ZOOM,
    //         0,
    //         MAX_ZOOM,
    //         25,
    //       ],
    //       "heatmap-opacity": [
    //         "interpolate",
    //         ["linear"],
    //         ["zoom"],
    //         MIN_ZOOM,
    //         1,
    //         MAX_ZOOM,
    //         0,
    //       ],
    //     },
    //   },
    // },
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
      { type: "value", id: "floors" },
      { type: "value", id: "age" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "total_ppl",
      title: "Количество жителей",
      range: [
        { from: 1, to: 20, value: 4265, color: "#144d8a" },
        { from: 21, to: 70, value: 155, color: "#3650e3" },
        { from: 71, to: 140, value: 73, color: "#8f10f7" },
        { from: 140, to: 280, value: 38, color: "#d400ff" },
        { from: 281, to: 501, value: 4, color: "#ff0000" },
      ],
    },
    {
      id: "floors",
      title: "Количество этажей",
    },
    {
      id: "age",
      title: "Возраст здания",
    },
  ],
};
