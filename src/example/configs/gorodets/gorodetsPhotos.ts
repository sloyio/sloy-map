import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsPhotos: InputSloyLayer = {
  id: "gorodets-photos",
  title: "Самые фотографируемые места",
  filters: [
    {
      type: "range",
      filterVisualizations: [
        "gorodetsPhotosPointsLayer",
        "gorodetsPhotosHeatmapLayer",
      ],
      source: "gorodetsPhotosLayerSource",
      property: "year",
    },
    {
      title: "Местные или приезжие",
      type: "string[]",
      filterVisualizations: [
        "gorodetsPhotosPointsLayer",
        "gorodetsPhotosHeatmapLayer",
      ],
      source: "gorodetsPhotosLayerSource",
      property: "Place",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "gorodetsPhotosPointsLayer",
      source: "gorodetsPhotosLayerSource",
      openable: true,
      type: "map",
      property: "Place",
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
      id: "gorodetsPhotosHeatmapLayer",
      source: "gorodetsPhotosLayerSource",
      type: "map",
      mapLayerProps: {
        type: "heatmap",
        paint: {
          "heatmap-weight": {
            type: "exponential",
            property: "Place",
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
            "rgb(255, 140, 0)",
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

export const gorodetsPhotosSource: InputSloySource = {
  id: "gorodetsPhotosLayerSource",
  path: "/gorodets-photos.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    blocks: [
      { type: "tag", id: "Place" },
      { type: "value", id: "city" },
      { type: "value", id: "Country" },
      { type: "value", id: "Name" },
      { type: "value", id: "Surname" },
      { type: "value", id: "date" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "Place",
      title: "Местные или приезжие",
      values: {
        null: {
          title: "Неизвестно",
          color: "#ffffff",
        },
        Местные: {
          title: "Местные",
          color: "#ae00ff",
        },
        Приезжие: {
          title: "Приезжие",
          color: "#00b7ff",
        },
      },
    },
    {
      id: "city",
      title: "Из какого города человек",
    },
    {
      id: "Country",
      title: "Из какой страны человек",
    },
    {
      id: "Name",
      title: "Имя",
    },
    {
      id: "Surname",
      title: "Фамилия",
    },
    {
      id: "date",
      title: "Дата",
    },
    {
      title: "Год",
      id: "year",
      range: [
        { from: 2018, to: 2019, value: 20100, color: "#7793db" },
        { from: 2019, to: 2020, value: 31020, color: "#7793db" },
        { from: 2020, to: 2021, value: 32972, color: "#7793db" },
        { from: 2021, to: 2022, value: 37429, color: "#7793db" },
        { from: 2022, to: 2023, value: 43856, color: "#7793db" },
        { from: 2023, to: 2024, value: 13504, color: "#7793db" },
      ],
    },
  ],
};
