import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsPZZ: InputSloyLayer = {
  id: "gorodets-PZZ",
  title: "ПЗЗ",
  filters: [
    {
      title: "Тип ПЗЗ",
      type: "string[]",
      filterVisualizations: ["gorodetsPZZLineLayer", "gorodetsPZZFillLayer"],
      source: "gorodetsPZZLayerSource",
      property: "type use",
      totalType: "percent",
      postfix: "шт.",
      sortType: "config",
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
          "fill-opacity": 0.5,
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
      values: {
        "Ж-1": {
          title: "Ж-1",
          color: "#ffe131",
        },
        "Ж-1А": {
          title: "Ж-1А",
          color: "#ffd900",
        },
        "Ж-2": {
          title: "Ж-2",
          color: "#ffa903",
        },
        "Ж-2А": {
          title: "Ж-2А",
          color: "#d18b00",
        },
        "Ж-3": {
          title: "Ж-3",
          color: "#ff5402",
        },
        "Ж-3А": {
          title: "Ж-3А",
          color: "#cc4100",
        },
        "Ж-4А": {
          title: "Ж-4А",
          color: "#EB2520",
        },
        "Ж-5": {
          title: "Ж-5",
          color: "#acfd06",
        },
        "О-1": {
          title: "О-1",
          color: "#a923ad",
        },
        "О-1А": {
          title: "О-1А",
          color: "#801b83",
        },
        "О-2": {
          title: "О-2",
          color: "#cb79f6",
        },
        "О-2А": {
          title: "О-2А",
          color: "#b74af2",
        },
        "П-4": {
          title: "П-4",
          color: "#885a48",
        },
        "П-4А": {
          title: "П-4А",
          color: "#684437",
        },
        "Т-1": {
          title: "Т-1",
          color: "#5439a2",
        },
        СХИ: {
          title: "СХИ",
          color: "#edd5ac",
        },
        СХН: {
          title: "СХН",
          color: "#cfaa65",
        },
        "Р-1": {
          title: "Р-1",
          color: "#03ffc4",
        },
        "Р-1А": {
          title: "Р-1А",
          color: "#00d1a0",
        },
        "Р-2": {
          title: "Р-2",
          color: "#8cedb8",
        },
        "Р-3": {
          title: "Р-3",
          color: "#00af57",
        },
        "Р-4": {
          title: "Р-4",
          color: "#53968d",
        },
        "Р-5": {
          title: "Р-5",
          color: "#05654d",
        },
        Л: {
          title: "Л",
          color: "#1b8f68",
        },
        "СН-1": {
          title: "СН-1",
          color: "#2f4d00",
        },
        "СН-2": {
          title: "СН-2",
          color: "#66b565",
        },
        В: {
          title: "В",
          color: "#a4cee3",
        },
      },
    },
    {
      id: "S ha",
      title: "Площадь, га",
    },
  ],
};
