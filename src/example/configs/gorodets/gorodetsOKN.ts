import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsOKN: InputSloyLayer = {
  id: "gorodets-okn",
  title: "ОКН",
  description: "Объекты культурного наследия Городца.",
  filters: [
    {
      title: "Тип зоны",
      type: "string[]",
      filterVisualizations: [
        "gorodetsOKNZonesLineLayer",
        "gorodetsOKNZonesFillLayer",
      ],
      source: "gorodetsOKNZonesLayerSource",
      property: "type",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
    {
      title: "Категория",
      type: "string[]",
      filterVisualizations: [
        "gorodetsOKNZonesLineLayer",
        "gorodetsOKNZonesFillLayer",
      ],
      source: "gorodetsOKNZonesLayerSource",
      property: "category",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "gorodetsOKNZonesLineLayer",
      source: "gorodetsOKNZonesLayerSource",
      openable: true,
      type: "map",
      property: "type",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 1,
          "line-opacity": 1,
          "line-dasharray": [2, 2],
        },
      },
    },
    {
      id: "gorodetsOKNZonesFillLayer",
      source: "gorodetsOKNZonesLayerSource",
      openable: true,
      type: "map",
      property: "type",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.3,
        },
      },
    },
    {
      id: "gorodetsOKNFillLayer",
      source: "gorodetsOKNLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 1,
          "fill-color": "#e5ff00",
        },
      },
    },
    {
      id: "gorodetsOKNHeatmapLayer",
      source: "gorodetsOKNLayerSource",
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
            "rgba(229, 255, 0, 0.05)",
            0.2,
            "rgba(229, 255, 0, 0.1)",
            0.4,
            "rgba(229, 255, 0, 0.3)",
            0.6,
            "rgba(229, 255, 0, 0.5)",
            1,
            "rgb(229, 255, 0)",
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            10,
            MAX_ZOOM,
            5,
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

export const gorodetsOKNSource: InputSloySource[] = [
  {
    id: "gorodetsOKNLayerSource",
    path: "/gorodets-okn.geojson",
    type: "geojson",
    coordsProperty: "coords",
    projection: "EPSG:32638",
    card: {
      title: "name",
      blocks: [
        { type: "value", id: "street" },
        { type: "value", id: "housenumbe" },
      ],
    },
    copyright: [],
    properties: [
      {
        id: "street",
        title: "Улица",
      },
      {
        id: "housenumbe",
        title: "Номер дома",
      },
    ],
  },
  {
    id: "gorodetsOKNZonesLayerSource",
    path: "/gorodets-okn-zones.geojson",
    type: "geojson",
    coordsProperty: "coords",
    projection: "EPSG:32638",
    card: {
      title: "name_full",
      blocks: [
        { type: "tag", id: "type" },
        { type: "tag", id: "category" },
        { type: "value", id: "act" },
      ],
    },
    copyright: [],
    properties: [
      {
        id: "type",
        title: "Тип зоны",
        values: {
          "Граница территории объекта культурного наследия": {
            title: "Граница территории объекта культурного наследия",
            color: "#ff5500",
          },
          "Охранная зона объекта культурного наследия": {
            title: "Охранная зона объекта культурного наследия",
            color: "#2bff00",
          },
          "Граница территории выявленного объекта культурного наследия": {
            title:
              "Граница территории выявленного объекта культурного наследия",
            color: "#ff00fb",
          },
          ЗРЗ: {
            title: "ЗРЗ",
            color: "#00eaff",
          },
          "ЗРЗ-1": {
            title: "ЗРЗ-1",
            color: "#0099ff",
          },
          "ЗРЗ-2": {
            title: "ЗРЗ-2",
            color: "#002aff",
          },
          "ЗРЗ-3": {
            title: "ЗРЗ-3",
            color: "#ff5f97",
          },
          ЗОПЛ: {
            title: "ЗОПЛ",
            color: "#fffc5f",
          },
          неизвестно: {
            title: "неизвестно",
            color: "#70757f",
          },
        },
      },
      {
        id: "category",
        title: "Категория",
        values: {
          "регионального значения": {
            title: "регионального значения",
            color: "#9600b4",
          },
          "федерального значения": {
            title: "федерального значения",
            color: "#b40039",
          },
          "Выявленные объекты культурного наследия": {
            title: "Выявленные объекты культурного наследия",
            color: "#00b496",
          },
          неизвестно: {
            title: "неизвестно",
            color: "#70757f",
          },
        },
      },
      {
        id: "act",
        title: "Постановление",
      },
    ],
  },
];
