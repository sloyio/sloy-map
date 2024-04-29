import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsRoads: InputSloyLayer = {
  id: "gorodets-roads",
  title: "Дороги",
  filters: [],
  visualizations: [
    {
      id: "gorodetsRoadsLinesLayer",
      source: "gorodetsRoadsLinesSource",
      type: "map",
      openable: true,
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "#ffffff",
        },
      },
    },
  ],
};

export const gorodetsRoadsSource: InputSloySource = {
  id: "gorodetsRoadsLinesSource",
  path: "/gorodets-roads.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "NAME",
    blocks: [{ type: "value", id: "REF" }],
  },
  copyright: [],
  properties: [
    {
      id: "REF",
      title: "Номер дороги",
    },
  ],
};
