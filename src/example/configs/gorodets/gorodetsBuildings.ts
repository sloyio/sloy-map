import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsBuildings: InputSloyLayer = {
  id: "gorodets-Buildings",
  title: "Здания",
  filters: [],
  visualizations: [
    {
      id: "gorodetsBuildingsFillLayer",
      source: "gorodetsBuildingsLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.75,
          "fill-color": "#ff0062",
        },
      },
    },
  ],
};

export const gorodetsBuildingsSource: InputSloySource = {
  id: "gorodetsBuildingsLayerSource",
  path: "/gorodets-buildings.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: ["addr_stree", "addr_house"],
    blocks: [
      { type: "value", id: "name" },
      { type: "tag", id: "amenity" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "name",
      title: "Название",
    },
    {
      id: "amenity",
      title: "Тип",
    },
  ],
};
