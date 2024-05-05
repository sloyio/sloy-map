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
      { type: "value", id: "period" },
      { type: "value", id: "floors_max" },
      { type: "value", id: "age_min" },
      { type: "value", id: "area" },
      { type: "value", id: "total_area" },
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
    {
      id: "period",
      title: "Период строительства",
    },
    {
      id: "floors_max",
      title: "Кол-во этажей",
    },
    {
      id: "age_min",
      title: "Год постройки",
    },
    {
      id: "area",
      title: "Площадь этажа, м²",
    },
    {
      id: "total_area",
      title: "Общая площадь, м²",
    },
  ],
};
