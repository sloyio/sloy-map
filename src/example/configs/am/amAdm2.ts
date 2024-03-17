import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amAdm2: InputSloyLayer = {
  id: "am-adm2",
  title: "Административные границы муниципалитетов",
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
      id: "Adm2BoundariesLineLayer",
      source: "Adm2BoundariesLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 1,
          "line-opacity": 1,
          "line-color": "#0088ff",
        },
      },
    },
    {
      id: "Adm2BoundariesFillLayer",
      source: "Adm2BoundariesLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.3,
          "fill-color": "#0088ff",
        },
      },
    },
  ],
};

export const amAdm2Source: InputSloySource = {
  id: "Adm2BoundariesLayerSource",
  path: "/adm2-boundaries.geojson",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    title: "shapeName",
    blocks: [],
  },
  properties: [],
  copyright: ["HDX"],
};
