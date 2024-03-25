import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const ekbDtp: InputSloyLayer = {
  id: "ekb-house-dtp",
  title: "ДТП",
  filters: [
    {
      type: "range",
      filterVisualizations: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
      source: "ekbDtpSource",
      property: "year",
    },
    {
      title: "Вред здоровью",
      type: "string",
      filterVisualizations: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
      source: "ekbDtpSource",
      property: "severity",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
    {
      title: "Участник ДТП",
      type: "string[]",
      filterVisualizations: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
      source: "ekbDtpSource",
      property: "participant_categories",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "ekbDtpPointsLayer",
      source: "ekbDtpSource",
      property: "severity",
      openable: true,
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
            1,
            MAX_ZOOM,
            12,
          ],
        },
      },
    },
    {
      id: "ekbDtpHeatmapLayer",
      source: "ekbDtpSource",
      property: "severity",
      type: "map",
      mapLayerProps: {
        type: "heatmap",
        paint: {
          "heatmap-weight": {
            type: "exponential",
            property: "weight",
            stops: [
              [0, 0],
              [1, 1],
            ],
          },
          "heatmap-intensity": 1,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0, 0, 255, 0)",
            0.2,
            "rgb(0, 255, 0)",
            0.4,
            "rgb(255, 255, 0)",
            0.6,
            "rgb(255, 0, 0)",
            1,
            "rgb(255, 0, 0)",
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            2,
            MAX_ZOOM,
            50,
          ],
          "heatmap-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            1,
            MAX_ZOOM,
            0,
          ],
        },
      },
    },
  ],
};

export const ekbDtpSource: InputSloySource = {
  id: "ekbDtpSource",
  type: "geojson",
  copyright: ["dtp"],
  card: {
    title: "category",
    additionalInfo: ["address"],
    blocks: [
      { type: "datetime", id: "datetime" },
      { type: "value", id: "light" },
      { type: "string[]", id: "weather" },
      { type: "string[]", id: "road_conditions" },
    ],
  },
  path: "https://map.ekaterinburg.city/ekb-dtp.json",
  dataByIdPath: `/api/dtp?id={DATA_BY_ID}`,
  properties: [
    {
      title: "Вред здоровью",
      id: "severity",
      values: {
        Легкий: { color: "#36ccaa" },
        Тяжёлый: { color: "#fdcf4e" },
        "С погибшими": { color: "#ff0000" },
      },
    },
    {
      title: "Время",
      id: "datetime",
    },
    {
      title: "Время суток",
      id: "light",
    },
    {
      title: "Погода",
      id: "weather",
    },
    {
      title: "Дорожные условия",
      id: "road_conditions",
    },
    {
      title: "Адресс",
      id: "address",
    },
    {
      title: "Участники",
      id: "participants",
    },
    {
      title: "Категории",
      id: "participant_categories",
      type: "string[]",
    },
    {
      title: "Количество участникиков",
      id: "participants_count",
    },
    {
      title: "Транспортные средства",
      id: "vehicles",
    },
    {
      title: "Год",
      id: "year",
      range: [
        { from: 2015, to: 2016, value: 1014, color: "#7793db" },
        { from: 2016, to: 2017, value: 805, color: "#7793db" },
        { from: 2017, to: 2018, value: 730, color: "#7793db" },
        { from: 2018, to: 2019, value: 978, color: "#7793db" },
        { from: 2019, to: 2020, value: 1180, color: "#7793db" },
        { from: 2020, to: 2021, value: 1114, color: "#7793db" },
        { from: 2021, to: 2022, value: 1243, color: "#7793db" },
        { from: 2022, to: 2023, value: 1058, color: "#7793db" },
      ],
    },
  ],
};
