import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amForest: InputSloyLayer = {
  id: "am-forest",
  title: "Лесные массивы",
  initialViewState: COUNTRY_VIEW,
  description:
    "Этот слой показывает распределение лесных территорий в Армении.",
  updatedAt: "2016-12-08T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-64",
    label: "Источник",
  },
  filters: [],
  visualizations: [
    {
      id: "armenianForestAreasLayer",
      source: "armenianForestAreasLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 1,
          "fill-color": "#0a6400",
        },
      },
    },
  ],
};

export const amForestSource: InputSloySource = {
  id: "armenianForestAreasLayerSource",
  path: "/forested_areas.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    blocks: [
      {
        type: "value",
        id: "OBJECTID",
      },
      {
        type: "value",
        id: "Shape_Area",
      },
    ],
  },
  properties: [
    {
      id: "OBJECTID",
      title: "ID",
    },
    {
      id: "Shape_Area",
      title: "Площадь, м²",
    },
  ],
  copyright: ["DCA"],
};
