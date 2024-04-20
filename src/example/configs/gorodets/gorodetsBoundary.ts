import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsBoundary: InputSloyLayer = {
  id: "gorodets-boundary",
  title: "Границы города",
  filters: [],
  visualizations: [
    {
      id: "gorodetsBoundaryLineLayer",
      source: "gorodetsBoundaryLayerSource",
      openable: true,
      type: "map",
      property: "ru",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "#00eeff",
        },
      },
    },
    {
      id: "gorodetsBoundaryFillLayer",
      source: "gorodetsBoundaryLayerSource",
      openable: true,
      type: "map",
      property: "ru",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.3,
          "fill-color": "#00eeff",
        },
      },
    },
  ],
};

export const gorodetsBoundarySource: InputSloySource = {
  id: "gorodetsBoundaryLayerSource",
  path: "/gorodets-boundary.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "NAME",
    blocks: [
      { type: "value", id: "admin_level" },
      { type: "value", id: "ADMIN_L3" },
      { type: "value", id: "ADMIN_L4" },
      { type: "value", id: "ADMIN_L6" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "admin_level",
      title: "Административный уровень",
    },
    {
      id: "ADMIN_L3",
      title: "Федеральный округ",
    },
    {
      id: "ADMIN_L4",
      title: "Область",
    },
    {
      id: "ADMIN_L6",
      title: "Муниципальный район",
    },
  ],
};
