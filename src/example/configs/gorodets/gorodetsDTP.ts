import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsDTP: InputSloyLayer = {
  id: "gorodets-dtp",
  title: "ДТП",
  filters: [
    {
      type: "range",
      filterVisualizations: [
        "gorodetsDtpPointsLayer",
        "gorodetsDtpHeatmapLayer",
      ],
      source: "gorodetsDTPLayerSource",
      property: "year",
    },
    {
      title: "Тип происшествия",
      type: "string[]",
      filterVisualizations: [
        "gorodetsDtpPointsLayer",
        "gorodetsDtpHeatmapLayer",
      ],
      source: "gorodetsDTPLayerSource",
      property: "FeatureC_3",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "gorodetsDtpPointsLayer",
      source: "gorodetsDTPLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "circle",
        paint: {
          "circle-color": "#fa4616",
          "circle-stroke-width": 1,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            0,
            MAX_ZOOM,
            10,
          ],
        },
      },
    },
    {
      id: "gorodetsDtpHeatmapLayer",
      source: "gorodetsDTPLayerSource",
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
            2,
            MAX_ZOOM,
            50,
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

export const gorodetsDTPSource: InputSloySource = {
  id: "gorodetsDTPLayerSource",
  path: "/gorodets-dtp.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "FeatureC_3",
    blocks: [{ type: "value", id: "FeatureC_4" }],
  },
  copyright: [],
  properties: [
    {
      id: "FeatureC_4",
      title: "Дата",
    },
    {
      title: "Год",
      id: "year",
      range: [
        { from: 2015, to: 2016, value: 29, color: "#7793db" },
        { from: 2016, to: 2017, value: 30, color: "#7793db" },
        { from: 2017, to: 2018, value: 27, color: "#7793db" },
        { from: 2018, to: 2019, value: 46, color: "#7793db" },
        { from: 2019, to: 2020, value: 59, color: "#7793db" },
        { from: 2020, to: 2021, value: 30, color: "#7793db" },
        { from: 2021, to: 2022, value: 26, color: "#7793db" },
        { from: 2022, to: 2023, value: 25, color: "#7793db" },
        { from: 2023, to: 2024, value: 33, color: "#7793db" },
        { from: 2024, to: 2025, value: 8, color: "#7793db" },
      ],
    },
  ],
};
