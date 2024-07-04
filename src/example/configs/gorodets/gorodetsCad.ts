import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsCad: InputSloyLayer = {
  id: "gorodets-cad",
  title: "Кадастр",
  filters: [],
  visualizations: [
    {
      id: "gorodetsCadLineLayer",
      source: "gorodetsCadLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 1,
          "line-opacity": 0.75,
          "line-color": "#ff0048",
        },
      },
    },
    {
      id: "gorodetsCadFillLayer",
      source: "gorodetsCadLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.15,
          "fill-color": "#ff0048",
        },
      },
    },
  ],
};

export const gorodetsCadSource: InputSloySource = {
  id: "gorodetsCadLayerSource",
  path: "/gorodets-cad.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:4326",
  card: {
    title: "CAD_N",
    blocks: [
      { type: "value", id: "AREA" },
      { type: "value", id: "STATUS" },
      { type: "value", id: "UTL_DOC" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "AREA",
      title: "Площадь, м²",
    },
    {
      id: "STATUS",
      title: "Статус",
    },
    {
      id: "UTL_DOC",
      title: "Разрешенное использование",
    },
  ],
};
