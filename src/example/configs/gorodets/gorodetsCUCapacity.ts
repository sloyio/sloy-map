import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsCUCapacity: InputSloyLayer = {
  id: "gorodets-cucapacity",
  title: "Пространственная политика",
  filters: [
    {
      title: "Подтипы",
      type: "string[]",
      filterVisualizations: [
        "gorodetsCUCapacityLineLayer",
        "gorodetsCUCapacityFillLayer",
      ],
      source: "gorodetsCUCapacityLayerSource",
      property: "type2",
      totalType: "percent",
      postfix: "шт.",
      sortType: "config",
    },
  ],
  visualizations: [
    {
      id: "gorodetsCUCapacityLineLayer",
      source: "gorodetsCUCapacityLayerSource",
      openable: true,
      type: "map",
      property: "type2",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 1,
          "line-opacity": 1,
        },
      },
    },
    {
      id: "gorodetsCUCapacityFillLayer",
      source: "gorodetsCUCapacityLayerSource",
      openable: true,
      type: "map",
      property: "type2",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.7,
        },
      },
    },
  ],
};

export const gorodetsCUCapacitySource: InputSloySource = {
  id: "gorodetsCUCapacityLayerSource",
  path: "/gorodets-cu-capacity.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    blocks: [
      { type: "tag", id: "type2" },
      { type: "value", id: "S ha" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "type2",
      title: "Тип",
      values: {
        "Зоны перспективного развития": {
          title: "Зоны перспективного развития",
          color: "#3ff716",
        },
        "Зоны умеренного развития": {
          title: "Зоны умеренного развития",
          color: "#e0be00",
        },
        "Основные зоны развития": {
          title: "Основные зоны развития",
          color: "#ff3168",
        },
      },
    },
    {
      id: "S ha",
      title: "Площадь, га",
    },
  ],
};
