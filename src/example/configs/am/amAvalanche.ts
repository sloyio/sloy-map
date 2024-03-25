import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amAvalanche: InputSloyLayer = {
  id: "am-avalanche",
  title: "Уровень лавинной опасности",
  description: "Этот слой показывает уровень опасности лавин в Армении.",
  updatedAt: "2023-03-28T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-93",
    label: "Источник",
  },
  initialViewState: COUNTRY_VIEW,
  filters: [
    {
      title: "Уровни",
      property: "DangerLvl",
      type: "string",
      filterVisualizations: ["AvalancheHazardLevelLayer"],
      source: "AvalancheHazardLevelLayerSource",
      sortType: "config",
    },
  ],
  visualizations: [
    {
      id: "AvalancheHazardLevelLayer",
      source: "AvalancheHazardLevelLayerSource",
      openable: true,
      type: "map",
      property: "DangerLvl",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.6,
        },
      },
    },
  ],
};

export const amAvalancheSource: InputSloySource = {
  id: "AvalancheHazardLevelLayerSource",
  path: "/avalanche_hazard_level.json",
  type: "geojson",
  projection: "EPSG:28408",
  card: {
    blocks: [
      {
        type: "tag",
        id: "DangerLvl",
      },
      {
        type: "value",
        id: "Zone",
      },
      {
        type: "value",
        id: "Area",
      },
      {
        type: "value",
        id: "Perimeter",
      },
      {
        type: "value",
        id: "Densty",
      },
      {
        type: "value",
        id: "Reccurence",
      },
      {
        type: "value",
        id: "Volume",
      },
    ],
  },
  properties: [
    {
      id: "DangerLvl",
      title: "Уровень опасности",
      values: {
        Strong: {
          title: "Strong",
          color: "#ff00f7",
        },
        Temperate: {
          title: "Temperate",
          color: "#0022ff",
        },
        Weak: {
          title: "Weak",
          color: "#009fae",
        },
      },
    },
    {
      id: "Zone",
      title: "Зона",
    },
    {
      id: "Area",
      title: "Площадь, м²",
    },
    {
      id: "Perimeter",
      title: "Периметр, км",
    },
    {
      id: "Densty",
      title: "Плотность",
    },
    {
      id: "Reccurence",
      title: "Рецидив",
    },
    {
      id: "Volume",
      title: "Объём",
    },
  ],
  copyright: ["DCA"],
};
