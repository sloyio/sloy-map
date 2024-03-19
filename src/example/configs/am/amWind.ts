import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amWind: InputSloyLayer = {
  id: "am-wind",
  title: "Ветровые ресурсы",
  description:
    "Этот слой показывает среднегодовой потенциал ветровых ресурсов для Армении на высоте 50 метров.",
  updatedAt: "2017-04-01T19:00:00.000Z",
  license: "No license provided",
  initialViewState: COUNTRY_VIEW,
  link: {
    href: "https://data.opendata.am/dataset/sustc-164",
    label: "Источник",
  },
  filters: [
    {
      title: "м/сек",
      property: "Wind_Speed",
      type: "string",
      filterVisualizations: ["armenianWindResourcesLayer"],
      source: "armenianWindResourcesLayerSource",
      postfix: "шт.",
      totalHeader: "count",
      totalType: "percent",
      sortType: "config",
    },
  ],
  visualizations: [
    {
      id: "armenianWindResourcesLayer",
      source: "armenianWindResourcesLayerSource",
      openable: true,
      property: "Wind_Speed",
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

export const amWindSource: InputSloySource = {
  id: "armenianWindResourcesLayerSource",
  path: "/wind_resources.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    blocks: [
      {
        type: "tag",
        id: "Utility",
      },
      {
        type: "value",
        id: "Wind_Speed",
      },
      {
        type: "value",
        id: "Wind_Power",
      },
    ],
  },
  properties: [
    {
      id: "Utility",
      title: "Полезность",
      values: {
        Poor: {
          color: "#77a1ae",
        },
        Marginal: {
          color: "#ee6b75",
        },
        Good: {
          color: "#d89600",
        },
        Excellent: {
          color: "#00bb83",
        },
      },
    },
    {
      id: "Wind_Speed",
      title: "Скорость ветра, м/сек",
      values: {
        "0 - 6.0": {
          title: "0 - 6.0",
          color: "rgba(255, 255, 255, .2)",
        },
        "6.0 - 6.8": {
          title: "6.0 - 6.8",
          color: "#feaf77",
        },
        "7.5 - 8.1": {
          title: "7.5 - 8.1",
          color: "#f1605d",
        },
        "8.1 - 8.6": {
          title: "8.1 - 8.6",
          color: "#b63679",
        },
        "8.6 - 9.5": {
          title: "8.6 - 9.5",
          color: "#721f81",
        },
        ">9.5": {
          title: ">9.5",
          color: "#2d115f",
        },
      },
    },
    {
      id: "Wind_Power",
      title: "Сила ветра, км/ч",
    },
  ],
  copyright: ["DCA"],
};
