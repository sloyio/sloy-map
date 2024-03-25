import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amPrecipitations: InputSloyLayer = {
  id: "am-precipitations",
  title: "Среднегодовой уровень осадков",
  description:
    "В этом слое показан среднегодовой уровень осадков в Армении. Эти данные были получены на основе анализа прямых наблюдений более чем 180 пунктов мониторинга. Данные метеорологических станций и пунктов наблюдений с короткими сериями измерений были сокращены с помощью картографического метода (для ультракоротких серий) и обычного метода соотношений.",
  updatedAt: "2017-02-16T19:00:00.000Z",
  license: "No license provided",
  initialViewState: COUNTRY_VIEW,
  link: {
    href: "https://data.opendata.am/dataset/sustc-92",
    label: "Источник",
  },
  filters: [
    {
      title: "мм/год",
      property: "Precipitat",
      type: "string",
      filterVisualizations: ["armenianPrecipitationsLevelLayer"],
      source: "armenianPrecipitationsLevelLayerSource",
    },
  ],
  visualizations: [
    {
      id: "armenianPrecipitationsLevelLayer",
      source: "armenianPrecipitationsLevelLayerSource",
      openable: true,
      property: "Precipitat",
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

export const amPrecipitationsSource: InputSloySource = {
  id: "armenianPrecipitationsLevelLayerSource",
  path: "/precipitations_level.json",
  type: "geojson",
  projection: "EPSG:28408",
  card: {
    blocks: [
      {
        type: "value",
        id: "Precipitat",
      },
      {
        type: "value",
        id: "Area",
      },
    ],
  },
  properties: [
    {
      id: "Precipitat",
      title: "Среднегодовой уровень осадков, мм/год",
      values: {
        200: {
          color: "#8bc5ff",
        },
        300: {
          color: "#7ab2eb",
        },
        400: {
          color: "#6a9ed6",
        },
        500: {
          color: "#598bc1",
        },
        600: {
          color: "#4977ad",
        },
        700: {
          color: "#386498",
        },
        800: {
          color: "#275083",
        },
        900: {
          color: "#173d6f",
        },
        1000: {
          color: "#06295a",
        },
      },
    },
    {
      id: "Area",
      title: "Площадь, м²",
    },
  ],
  copyright: ["DCA"],
};
