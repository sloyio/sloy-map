import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW, MAX_ZOOM, MIN_ZOOM } from "../../constants";

export const amUnesco: InputSloyLayer = {
  id: "am-unesco",
  title: "Объекты культурного наследия ЮНЕСКО",
  description: "Этот слой показывает расположение объектов ЮНЕСКО на Кавказе.",
  initialViewState: COUNTRY_VIEW,
  updatedAt: "2020-01-22T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-1060",
    label: "Источник",
  },
  filters: [],
  visualizations: [
    {
      id: "UnescoPointsLayerSource",
      source: "UnescoLayerSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "circle",
        paint: {
          "circle-color": "#fa16aa",
          "circle-stroke-width": 1,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            10,
            MAX_ZOOM,
            15,
          ],
        },
      },
    },
  ],
};

export const amUnescoSource: InputSloySource = {
  id: "UnescoLayerSource",
  path: "/unesco.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    title: "name_en",
    blocks: [],
  },
  properties: [],
  copyright: ["DCA"],
};
