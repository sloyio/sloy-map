import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsWetland: InputSloyLayer = {
  id: "gorodets-wetland",
  title: "Водно-болотные угодья",
  filters: [],
  visualizations: [
    {
      id: "gorodetsWetlandLineLayer",
      source: "gorodetsWetlandLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "#00ffd0",
        },
      },
    },
    {
      id: "gorodetsWetlandFillLayer",
      source: "gorodetsWetlandLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.5,
          "fill-color": "#00ffd0",
        },
      },
    },
  ],
};

export const gorodetsWetlandSource: InputSloySource = {
  id: "gorodetsWetlandLayerSource",
  path: "/gorodets-wetland.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "name",
    blocks: [{ type: "value", id: "description" }],
  },
  copyright: [],
  properties: [
    {
      id: "description",
      title: "Описание",
    },
  ],
};
