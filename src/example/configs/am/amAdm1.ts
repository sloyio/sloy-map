import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amAdm1: InputSloyLayer = {
  id: "am-adm1",
  title: "Административные границы регионов",
  initialViewState: COUNTRY_VIEW,
  updatedAt: "2022-01-05T19:00:00.000Z",
  license: "ODbL",
  link: {
    href: "https://data.humdata.org/dataset/geoboundaries-admin-boundaries-for-armenia",
    label: "Источник",
  },
  filters: [],
  visualizations: [
    {
      id: "Adm1BoundariesLineLayer",
      source: "Adm1BoundariesLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 1,
          "line-opacity": 1,
          "line-color": "#88ddff",
        },
      },
    },
    {
      id: "Adm1BoundariesFillLayer",
      source: "Adm1BoundariesLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.3,
          "fill-color": "#88ddff",
        },
      },
    },
  ],
};

export const amAdm1Source: InputSloySource = {
  id: "Adm1BoundariesLayerSource",
  path: "/adm1-boundaries.geojson",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    title: "shapeName",
    blocks: [],
  },
  properties: [],
  copyright: ["HDX"],
};
