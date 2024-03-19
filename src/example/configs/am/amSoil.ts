import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amSoil: InputSloyLayer = {
  id: "am-soil",
  title: "Типы почвы",
  initialViewState: COUNTRY_VIEW,
  description:
    "Этот слой показывает типы почв, встречающиеся в Армении. Эти данные были созданы для проекта «Поддержка устойчивого горного развития на Кавказе (Sustainable Caucasus)», финансируемого SCOPES.",
  updatedAt: "2017-02-14T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-78",
    label: "Источник",
  },
  filters: [
    {
      title: "Типы",
      property: "Descriptio",
      type: "string",
      filterVisualizations: ["armenianSoilTypesLayer"],
      source: "armenianSoilTypesLayerSource",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "armenianSoilTypesLayer",
      source: "armenianSoilTypesLayerSource",
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

export const amSoilSource: InputSloySource = {
  id: "armenianSoilTypesLayerSource",
  path: "/soil_types.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    blocks: [
      {
        type: "tag",
        id: "Tip",
      },
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
      id: "Tip",
      title: "Тип",
      values: {
        "Alpine Soils": {
          title: "Alpine Soils",
          color: "#986039",
        },
        "Mountain-steppe soils": {
          title: "Mountain-steppe soils",
          color: "#b47e00",
        },
        "Mountanious-forest soils": {
          title: "Mountanious-forest soils",
          color: "#99a300",
        },
        "Desert soils": {
          title: "Desert soils",
          color: "#bc9b85",
        },
        "Mountanious stony semidesert soils": {
          title: "Mountanious stony semidesert soils",
          color: "#c3bebd",
        },
      },
    },
    {
      id: "Descriptio",
      title: "Описание",
      values: {
        "Alluvial-meadow saline lands and alkali soils": {
          color: "#9ddcda",
          title: "Alluvial-meadow saline lands and alkali soils",
        },
        "Alluvial-meadow soils irrigated also in the past": {
          color: "#2fc9dd",
          title: "Alluvial-meadow soils irrigated also in the past",
        },
        "Alpine mountaine-medow turf-peat soils": {
          color: "#85b70f",
          title: "Alpine mountaine-medow turf-peat soils",
        },
        "Brown mountainous-forest soils of dry firests and bushes": {
          color: "#b98746",
          title: "Brown mountainous-forest soils of dry firests and bushes",
        },
        "Brown mountainous-forest soils of moderately humid forests": {
          color: "#d6a15c",
          title: "Brown mountainous-forest soils of moderately humid forests",
        },
        "Desalinated here and there fat mountainous black soils of humid steppe":
          {
            color: "#75552c",
            title:
              "Desalinated here and there fat mountainous black soils of humid steppe",
          },
        "Gray mountainous here and there gypsiferous & saline soils": {
          color: "#979797",
          title: "Gray mountainous here and there gypsiferous & saline soils",
        },
        "Gypsiferous and here and there saline colored soils": {
          color: "#d1dbdd",
          title: "Gypsiferous and here and there saline colored soils",
        },
        "Lake Sevan's outcropped bottomlands": {
          color: "#2863da",
          title: "Lake Sevan's outcropped bottomlands",
        },
        "Meadow saline lands and alkali soils": {
          color: "#bedd74",
          title: "Meadow saline lands and alkali soils",
        },
        "Meadow-marshy soils": {
          color: "#0fbf6a",
          title: "Meadow-marshy soils",
        },
        "Mountain-fulvous soils of dry steppes": {
          color: "#dbb3bc",
          title: "Mountain-fulvous soils of dry steppes",
        },
        "Mountainous carbonated and typical black soils with weakly developed black soils of moderately humid steppes":
          {
            color: "#eecec1",
            title:
              "Mountainous carbonated and typical black soils with weakly developed black soils of moderately humid steppes",
          },
        "Mountainous-forest steppe soils": {
          color: "#677288",
          title: "Mountainous-forest steppe soils",
        },
        "Non-developed soils of snow-closed zone": {
          color: "#edec8d",
          title: "Non-developed soils of snow-closed zone",
        },
        "Subalpian mountain-medow black soil-like": {
          color: "#565b0c",
          title: "Subalpian mountain-medow black soil-like",
        },
        "Subalpian mountain-medow brown soils": {
          color: "#8f5a21",
          title: "Subalpian mountain-medow brown soils",
        },
        "Watered and irrigated also in the past cultivated gray mountainous soils":
          {
            color: "#388ef0",
            title:
              "Watered and irrigated also in the past cultivated gray mountainous soils",
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
