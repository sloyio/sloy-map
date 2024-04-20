import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

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
