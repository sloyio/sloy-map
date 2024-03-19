import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amRivers: InputSloyLayer = {
  id: "am-rivers",
  title: "Реки (5 км и более)",
  initialViewState: COUNTRY_VIEW,
  description:
    "В этом слое представлены все реки Армении длиной 5 км и более. Это полностью связанная и топологически корректная система рек Армении, закодированная с помощью системы кодирования ERICA (European Rivers and Catchment), разработанной для Европейского агентства по окружающей среде.",
  updatedAt: "2016-11-21T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-27",
    label: "Источник",
  },
  filters: [],
  visualizations: [
    {
      id: "armenianRiversLayer",
      source: "armenianRiversLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "#00ccff",
        },
      },
    },
  ],
};

export const amRiversSource: InputSloySource = {
  id: "armenianRiversLayerSource",
  path: "/rivers.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    title: "Name",
    blocks: [
      {
        type: "value",
        id: "OBJECTID",
      },
      {
        type: "value",
        id: "Shape_Leng",
      },
    ],
  },
  properties: [
    {
      id: "OBJECTID",
      title: "ID",
    },
    {
      id: "Shape_Leng",
      title: "Длина, м",
    },
  ],
  copyright: ["DCA"],
};
