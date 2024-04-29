import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsBuildingsAge: InputSloyLayer = {
  id: "gorodets-buildings-age",
  title: "Возраст зданий",
  filters: [
    {
      type: "range",
      filterVisualizations: [
        "gorodetsBuildingsAgeLineLayer",
        "gorodetsBuildingsAgeFillLayer",
      ],
      source: "gorodetsBuildingsAgeLayerSource",
      property: "age_min",
    },
  ],
  visualizations: [
    {
      id: "gorodetsBuildingsAgeLineLayer",
      source: "gorodetsBuildingsAgeLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
        },
      },
    },
    {
      id: "gorodetsBuildingsAgeFillLayer",
      source: "gorodetsBuildingsAgeLayerSource",
      openable: true,
      type: "map",
      property: "age_min",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.85,
        },
      },
    },
  ],
};

export const gorodetsBuildingsAgeSource: InputSloySource = {
  id: "gorodetsBuildingsAgeLayerSource",
  path: "/gorodets-buildings_age.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:4326",
  card: {
    title: ["addr_stree", "addr_house"],
    blocks: [
      { type: "value", id: "name" },
      { type: "tag", id: "amenity" },
      { type: "value", id: "age_min" },
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
      id: "age_min",
      title: "Возраст здания",
      range: [
        { from: 1880, to: 1900, value: 129, color: "#ff7461" },
        { from: 1900, to: 1920, value: 30, color: "#ffA34e" },
        { from: 1920, to: 1940, value: 27, color: "#fee678" },
        { from: 1940, to: 1960, value: 46, color: "#85e634" },
        { from: 1960, to: 1980, value: 59, color: "#0f9467" },
        { from: 1980, to: 2000, value: 30, color: "#71b3ff" },
        { from: 2000, to: 2022, value: 26, color: "#c270ff" },
      ],
    },
  ],
};
