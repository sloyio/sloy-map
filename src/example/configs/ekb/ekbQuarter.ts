import { InputSloyLayer, InputSloySource } from "@/types";

export const ekbQuarter: InputSloyLayer = {
  id: "ekb-quarter",
  title: "Квартальные",
  filters: [],
  visualizations: [
    {
      id: "ekbQuarterLayer",
      source: "ekbQuarterSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-color": "#9AADCC",
          "fill-opacity": 0.6,
        },
      },
    },
    {
      id: "ekbQuarterLayerStroke",
      source: "ekbQuarterSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-color": "#000",
          "line-opacity": 0.5,
          "line-width": 1.5,
        },
      },
    },
  ],
};

export const ekbQuarterSource: InputSloySource = {
  id: "ekbQuarterSource",
  type: "geojson",
  path: "https://map.ekaterinburg.city/ekb-quarters.json",
  copyright: ["ekbQuarter"],
  card: {
    title: "quarterTitle",
    blocks: [
      {
        type: "action-link",
        id: "url",
        content: "Посмотреть телефон и почту квартального",
      },
      { type: "divider" },
      { type: "value", id: "districtTitle" },
    ],
  },
  properties: [
    {
      id: "districtTitle",
      title: "Район",
    },
  ],
};
