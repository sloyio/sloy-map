import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsCommerce: InputSloyLayer = {
  id: "gorodets-commerce",
  title: "Коммерция",
  filters: [
    {
      title: "Тип коммерции",
      type: "string[]",
      filterVisualizations: ["gorodetsCommercePointsLayer"],
      source: "gorodetsCommerceLayerSource",
      property: "category",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "gorodetsCommercePointsLayer",
      type: "map",
      source: "gorodetsCommerceLayerSource",
      openable: true,
      mapLayerProps: {
        type: "circle",
        paint: {
          "circle-color": "#93fa16",
          "circle-stroke-width": 1,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            0,
            MAX_ZOOM,
            7.5,
          ],
        },
      },
    },
    {
      id: "gorodetsCommerceHeatmapLayer",
      source: "gorodetsCommerceLayerSource",
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

export const gorodetsCommerceSource: InputSloySource = {
  id: "gorodetsCommerceLayerSource",
  path: "/gorodets-commerce.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:4326",
  card: {
    title: "Name",
    blocks: [
      { type: "tag", id: "category" },
      { type: "tag", id: "category_R" },
      { type: "value", id: "address" },
      { type: "value", id: "rates" },
      { type: "value", id: "mark" },
      { type: "value", id: "url" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "category",
      title: "Категория",
    },
    {
      id: "category_R",
      title: "Подкатегория",
    },
    {
      id: "address",
      title: "Адрес",
    },
    {
      id: "rates",
      title: "Количество оценок",
    },
    {
      id: "mark",
      title: "Рейтинг",
    },
    {
      id: "url",
      title: "Организация на Яндекс-картах",
    },
  ],
};
