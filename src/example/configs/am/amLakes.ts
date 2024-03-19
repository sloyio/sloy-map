import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amLakes: InputSloyLayer = {
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

export const amLakesSource: InputSloySource = {
  id: "armenianLakesAndReservoirsSource",
  path: "/lakes_and_reservoirs.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    title: "Name_eng",
    blocks: [
      {
        type: "value",
        id: "BMO",
      },
      {
        type: "value",
        id: "CAcode",
      },
      {
        type: "value",
        id: "RScode",
      },
      {
        type: "value",
        id: "LKcode",
      },
      {
        type: "value",
        id: "Shape_Area",
      },
    ],
  },
  properties: [
    {
      id: "BMO",
      title: "Организация по управлению бассейном",
    },
    {
      id: "CAcode",
      title: "CAcode",
    },
    {
      id: "RScode",
      title: "RScode",
    },
    {
      id: "LKcode",
      title: "LKcode",
    },
    {
      id: "Shape_Area",
      title: "Площадь, м²",
    },
  ],
  copyright: ["DCA"],
};
