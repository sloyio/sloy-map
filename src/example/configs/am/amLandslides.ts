import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amLandslides: InputSloyLayer = {
  id: "am-landslides",
  title: "Оползни",
  initialViewState: COUNTRY_VIEW,
  description:
    "Этот слой показывает расположение и форму оползней на территории Армении.",
  updatedAt: "2017-02-16T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-95",
    label: "Источник",
  },
  filters: [],
  visualizations: [
    {
      id: "armenianLandslidesLayer",
      source: "armenianLandslidesLayerSource",
      openable: false,
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.8,
          "fill-color": "#ff3300",
        },
      },
    },
  ],
};

export const amLandslidesSource: InputSloySource = {
  id: "armenianLandslidesLayerSource",
  path: "/landslides.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    title: "Name_eng",
    blocks: [],
  },
  properties: [],
  copyright: ["DCA"],
};
