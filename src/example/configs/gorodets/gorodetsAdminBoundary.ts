import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsAdminBoundary: InputSloyLayer = {
  id: "gorodets-admin-boundary",
  title: "Границы муниципального округа",
  filters: [],
  visualizations: [
    {
      id: "gorodetsAdminBoundaryLineLayer",
      source: "gorodetsAdminBoundaryLayerSource",
      openable: true,
      type: "map",
      property: "ru",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "#8400ff",
        },
      },
    },
    {
      id: "gorodetsAdminBoundaryFillLayer",
      source: "gorodetsAdminBoundaryLayerSource",
      openable: true,
      type: "map",
      property: "ru",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.3,
          "fill-color": "#8400ff",
        },
      },
    },
  ],
};

export const gorodetsAdminBoundarySource: InputSloySource = {
  id: "gorodetsAdminBoundaryLayerSource",
  path: "/gorodets-admin-boundary.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "name",
    blocks: [
      { type: "value", id: "admin_level" },
      { type: "value", id: "old_name" },
      { type: "value", id: "name:en" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "admin_level",
      title: "Административный уровень",
    },
    {
      id: "old_name",
      title: "Старое название",
    },
    {
      id: "name:en",
      title: "Название на английском",
    },
  ],
};
