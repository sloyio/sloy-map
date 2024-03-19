import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW, MAX_ZOOM, MIN_ZOOM } from "../../constants";

export const amMineral: InputSloyLayer = {
  id: "am-mineral",
  title: "Минеральные и пресноводные источники",
  description:
    "Этот слой показывает основные группы минеральных и пресноводных источников в Армении. Он был оцифрован с гидрогеологической карты, первоначально загруженной из Агентства по управлению водными ресурсами Министерства охраны природы Республики Армения.",
  updatedAt: "2020-07-06T19:00:00.000Z",
  license: "No license provided",
  initialViewState: COUNTRY_VIEW,
  link: {
    href: "https://data.opendata.am/dataset/sustc-1068",
    label: "Источник",
  },
  filters: [
    {
      title: "л/сек",
      property: "Flow_l_sec",
      type: "string",
      filterVisualizations: ["armenianMineralAndFreshwaterResourcesLayer"],
      source: "armenianMineralAndFreshwaterResourcesLayerSource",
      postfix: "шт.",
      totalHeader: "count",
      totalType: "percent",
      sortType: "config",
    },
  ],
  visualizations: [
    {
      id: "armenianMineralAndFreshwaterResourcesLayer",
      source: "armenianMineralAndFreshwaterResourcesLayerSource",
      openable: true,
      property: "Flow_l_sec",
      type: "map",
      mapLayerProps: {
        type: "circle",
        paint: {
          "circle-stroke-width": 1,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            5,
            MAX_ZOOM,
            10,
          ],
        },
      },
    },
  ],
};

export const amMineralSource: InputSloySource = {
  id: "armenianMineralAndFreshwaterResourcesLayerSource",
  path: "/mineral_and_freshwater_resources.json",
  type: "geojson",
  card: {
    blocks: [
      {
        type: "value",
        id: "Flow_l_sec",
      },
    ],
  },
  projection: "EPSG:28408",
  copyright: ["DCA"],
  properties: [
    {
      id: "Composit",
      title: "Тип источника",
    },
    {
      id: "Flow_l_sec",
      title: "Скорость потока, л/сек",
      values: {
        "<25": {
          title: "<25",
          color: "#d1e3f3",
        },
        "25-50": {
          title: "25...50",
          color: "#9ac8e1",
        },
        "50-100": {
          title: "50...100",
          color: "#529dcc",
        },
        "100-1000": {
          title: "100...1000",
          color: "#1c6cb1",
        },
        ">1000": {
          title: ">1000",
          color: "#08306b",
        },
      },
    },
  ],
};
