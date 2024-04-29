import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsOKN: InputSloyLayer = {
  id: "gorodets-okn",
  title: "ОКН",
  description: "Объекты культурного наследия Городца.",
  filters: [],
  visualizations: [
    {
      id: "gorodetsOKNFillLayer",
      source: "gorodetsOKNLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 1,
          "fill-color": "#e5ff00",
        },
      },
    },
    {
      id: "gorodetsOKNHeatmapLayer",
      source: "gorodetsOKNLayerSource",
      type: "map",
      mapLayerProps: {
        type: "heatmap",
        paint: {
          "heatmap-weight": {
            type: "exponential",
            property: "weight",
            stops: [
              [0, 0],
              [1, 1],
            ],
          },
          "heatmap-intensity": 1,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(229, 255, 0, 0.05)",
            0.2,
            "rgba(229, 255, 0, 0.1)",
            0.4,
            "rgba(229, 255, 0, 0.3)",
            0.6,
            "rgba(229, 255, 0, 0.5)",
            1,
            "rgb(229, 255, 0)",
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            10,
            MAX_ZOOM,
            5,
          ],
          "heatmap-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            1,
            MAX_ZOOM,
            0,
          ],
        },
      },
    },
  ],
};

export const gorodetsOKNSource: InputSloySource = {
  id: "gorodetsOKNLayerSource",
  path: "/gorodets-okn.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "name",
    blocks: [
      { type: "value", id: "street" },
      { type: "value", id: "housenumbe" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "street",
      title: "Улица",
    },
    {
      id: "housenumbe",
      title: "Номер дома",
    },
  ],
};
