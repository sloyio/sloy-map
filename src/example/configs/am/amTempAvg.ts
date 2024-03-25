import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amTempAvg: InputSloyLayer = {
  id: "am-temp-avg",
  title: "Среднегодовая температура",
  description:
    "На этой карте показана среднегодовая температура (в градусах Цельсия) в Армении. Она основана на наблюдениях более чем 90 метеорологических станций, действовавших в Армении с 1885 года. Данные метеорологических станций с короткими рядами наблюдений были приведены к 80-летнему периоду методом разностей. Данный ГИС-слой был подготовлен в рамках проекта Глобального экологического фонда (ГЭФ) и Армянского фонда возобновляемых ресурсов и энергоэффективности «Разработка географической информационной системы Армении для проектов возобновляемых источников энергии».",
  updatedAt: "2017-02-14T19:00:00.000Z",
  license: "No license provided",
  initialViewState: COUNTRY_VIEW,
  link: {
    href: "https://data.opendata.am/dataset/sustc-85",
    label: "Источник",
  },
  filters: [
    {
      title: "°C",
      property: "Temperatur",
      type: "string",
      filterVisualizations: ["armenianTemperatureLayer"],
      source: "armenianTemperatureLayerSource",
    },
  ],
  visualizations: [
    {
      id: "armenianTemperatureLayer",
      source: "armenianTemperatureLayerSource",
      openable: true,
      property: "Temperatur",
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

export const amTempAvgSource: InputSloySource = {
  id: "armenianTemperatureLayerSource",
  path: "/temperature.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    blocks: [
      {
        type: "value",
        id: "Temperatur",
      },
      {
        type: "value",
        id: "Area",
      },
    ],
  },
  properties: [
    {
      id: "Temperatur",
      title: "Среднегодовая температура, °C",
      values: {
        "-5": {
          color: "#fff5f0",
        },
        "-3": {
          color: "#ffe5d9",
        },
        "-1": {
          color: "#fdccb8",
        },
        "1": {
          color: "#fcaf93",
        },
        "3": {
          color: "#fc8f6f",
        },
        "5": {
          color: "#fc7050",
        },
        "7": {
          color: "#f44d37",
        },
        "9": {
          color: "#e22d26",
        },
        "11": {
          color: "#c5161b",
        },
        "13": {
          color: "#a50f15",
        },
        "15": {
          color: "#67000d",
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
