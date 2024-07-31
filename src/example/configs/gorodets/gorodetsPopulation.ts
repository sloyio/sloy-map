import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsPopulation: InputSloyLayer = {
  id: "gorodets-population",
  title: "Плотность населения",
  filters: [
    {
      type: "range",
      filterVisualizations: [
        "gorodetsPopulationLineLayer",
        "gorodetsPopulationFillLayer",
      ],
      source: "gorodetsPopulationLayerSource",
      property: "total_ppl_",
    },
    // {
    //   title: "Плотность населения",
    //   type: "string[]",
    //   filterVisualizations: [
    //     "gorodetsPopulationLineLayer",
    //     "gorodetsPopulationFillLayer",
    //   ],
    //   source: "gorodetsPopulationLayerSource",
    //   property: "total_ppl_",
    //   totalType: "percent",
    //   postfix: "шт.",
    //   sortType: "config",
    // },
  ],
  visualizations: [
    {
      id: "gorodetsPopulationLineLayer",
      source: "gorodetsPopulationLayerSource",
      type: "map",
      property: "total_ppl_",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
        },
      },
    },
    {
      id: "gorodetsPopulationFillLayer",
      source: "gorodetsPopulationLayerSource",
      type: "map",
      property: "total_ppl_",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.5,
        },
      },
    },
  ],
};

export const gorodetsPopulationSource: InputSloySource = {
  id: "gorodetsPopulationLayerSource",
  path: "/gorodets-population-hex.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    blocks: [],
  },
  copyright: [],
  properties: [
    {
      id: "total_ppl_",
      title: "Плотность населения",
      range: [
        { from: 0, to: 0, value: 53, color: "#3a4265" },
        { from: 2, to: 104, value: 22, color: "#144d8a" },
        { from: 104, to: 310, value: 40, color: "#3650e3" },
        { from: 310, to: 712, value: 10, color: "#8f10f7" },
        { from: 712, to: 1095, value: 7, color: "#d400ff" },
        { from: 1095, to: 1759, value: 7, color: "#ff0000" },
      ],
    },
  ],
};
