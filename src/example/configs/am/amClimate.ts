import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amClimate: InputSloyLayer = {
  id: "am-climate",
  title: "Климатические зоны",
  initialViewState: COUNTRY_VIEW,
  description:
    "Этот слой представляет собой карту климатических зон Армении, подготовленную в рамках проекта Глобального экологического фонда (ГЭФ) и Армянского фонда возобновляемых ресурсов и энергоэффективности «Развитие геоинформационной системы Армении для проектов возобновляемой энергетики».",
  updatedAt: "2017-02-13T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-74",
    label: "Источник",
  },
  filters: [
    {
      title: "Зоны",
      property: "Descriptio",
      type: "string",
      filterVisualizations: ["armenianClimateZonesLayer"],
      source: "armenianClimateZonesLayerSource",
    },
  ],
  visualizations: [
    {
      id: "armenianClimateZonesLayer",
      source: "armenianClimateZonesLayerSource",
      openable: true,
      property: "Descriptio",
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.6,
        },
      },
    },
  ],
};

export const amClimateSource: InputSloySource = {
  id: "armenianClimateZonesLayerSource",
  path: "/climate_zones.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    blocks: [
      {
        type: "value",
        id: "Descriptio",
      },
      {
        type: "value",
        id: "Shape_Area",
      },
    ],
  },
  properties: [
    {
      id: "Descriptio",
      title: "Описание зоны",
      values: {
        "Arid continental, with dry warm summersand moderate cold winters": {
          title:
            "Arid continental, with dry warm summersand moderate cold winters",
          color: "#d7191c",
        },
        "Moderate, warm arid summers and moderate cold winters": {
          title: "Moderate, warm arid summers and moderate cold winters",
          color: "#ffffff", // TODO, check in legend (source)
        },
        "Arid subtropical, with hot summers and calm winters": {
          title: "Arid subtropical, with hot summers and calm winters",
          color: "#e75437",
        },
        "Arid, continental, with hot summers and cold winters": {
          title: "Arid, continental, with hot summers and cold winters",
          color: "#f69053",
        },
        "Moderate, relatively dry warm summers and cold winters": {
          title: "Moderate, relatively dry warm summers and cold winters",
          color: "#febe4e",
        },
        "Moderate, relativly humid during all seasons": {
          title: "Moderate, relativly humid during all seasons",
          color: "#ffdf29",
        },
        "Moderate, with short cool summers and cold winters": {
          title: "Moderate, with short cool summers and cold winters",
          color: "#dcf02d",
        },
        "Moderate, with warm summers, relatively humid calm winters": {
          title: "Moderate, with warm summers, relatively humid calm winters",
          color: "#b8e156",
        },
        "Mountain tundra climate": {
          title: "Mountain tundra climate",
          color: "#8acc62",
        },
        "Warm summers and relatively calm winters": {
          title: "Warm summers and relatively calm winters",
          color: "#52b151",
        },
      },
    },
    {
      id: "Shape_Area",
      title: "Площадь, м²",
    },
  ],
  copyright: ["DCA"],
};
