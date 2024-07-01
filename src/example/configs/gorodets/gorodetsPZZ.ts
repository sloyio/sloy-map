import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsPZZ: InputSloyLayer = {
  id: "gorodets-PZZ",
  title: "ПЗЗ",
  filters: [
    {
      title: "Тип ПЗЗ",
      type: "string[]",
      filterVisualizations: [
        "gorodetsLanduseLineLayer",
        "gorodetsLanduseFillLayer",
      ],
      source: "gorodetsPZZLayerSource",
      property: "type use",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "gorodetsPZZLineLayer",
      source: "gorodetsPZZLayerSource",
      openable: true,
      type: "map",
      property: "type use",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 1,
          "line-opacity": 1,
          "line-color": "#ff3161",
        },
      },
    },
    {
      id: "gorodetsPZZFillLayer",
      source: "gorodetsPZZLayerSource",
      openable: true,
      type: "map",
      property: "type use",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.3,
          "fill-color": "#ff3161",
        },
      },
    },
  ],
};

export const gorodetsPZZSource: InputSloySource = {
  id: "gorodetsPZZLayerSource",
  path: "/gorodets-pzz.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "name",
    blocks: [
      { type: "tag", id: "type use" },
      { type: "value", id: "S ha" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "type use",
      title: "Тип ПЗЗ",
    },
    {
      id: "S ha",
      title: "Площадь, га",
    },
  ],
};
