import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amRadiation: InputSloyLayer = {
  id: "am-radiation",
  title: "Радиационный баланс",
  description:
    "Этот слой показывает радиационный баланс в Армении. Радиационный баланс подстилающей местности рассчитывается по уравнению: R=(Q+q)(1−Ao)−E, где R — значение радиационного баланса; Q и q — прямая и рассеянная радиация; Ao — альбедо подстилающей местности; E — эффективная земная радиация.",
  updatedAt: "2017-08-16T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-477",
    label: "Источник",
  },
  initialViewState: COUNTRY_VIEW,
  filters: [
    {
      title: "ккал/см²",
      property: "VALUE",
      type: "string",
      filterVisualizations: ["armenianRadiationBalanceLayer"],
      source: "armenianRadiationBalanceLayerSource",
    },
  ],
  visualizations: [
    {
      id: "armenianRadiationBalanceLayer",
      source: "armenianRadiationBalanceLayerSource",
      openable: true,
      property: "VALUE",
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.6,
        },
      },
    },
  ],
};

export const amRadiationSource: InputSloySource = {
  id: "armenianRadiationBalanceLayerSource",
  path: "/radiation_bal.json",
  type: "geojson",
  projection: "EPSG:28408",
  card: {
    blocks: [
      {
        type: "value",
        id: "VALUE",
      },
    ],
  },
  properties: [
    {
      id: "VALUE",
      title: "ккал/см²",
      values: {
        40: { color: "#fddede" },
        45: { color: "#feb7b9" },
        50: { color: "#fd9793" },
        55: { color: "#fd906c" },
        60: { color: "#f57a4e" },
        65: { color: "#e75338" },
        70: { color: "#cf2b1c" },
      },
    },
    {
      id: "UNIT",
      title: "Единицы измерения",
    },
  ],
  copyright: ["DCA"],
};
