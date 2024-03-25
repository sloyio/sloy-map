import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const ekbCrimes: InputSloyLayer = {
  id: "ekb-crimes",
  title: "Происшествия",
  description:
    "Слой содержит данные о правонарушениях, конфликтах и происшествиях, которые произошли в городе. Подготовлен в 2019 г. на основе сообщений в социальных сетях и новостных ресурсах. Автор датасета: Александр Бурцев, кандидат архитектуры.",
  filters: [
    {
      title: "Тип происшествия",
      property: "exident",
      type: "string",
      filterVisualizations: ["ekbCrimePointsLayer", "ekbCrimeHeatmapLayer"],
      source: "ekbCrimeLayerSource",
      postfix: "шт.",
      totalHeader: "count",
      totalType: "percent",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "ekbCrimePointsLayer",
      type: "map",
      source: "ekbCrimeLayerSource",
      openable: true,
      property: "exident",
      mapLayerProps: {
        type: "circle",
        paint: {
          "circle-color": "#f18f00",
          "circle-stroke-width": 1,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            2,
            MAX_ZOOM,
            8,
          ],
        },
      },
    },
    {
      id: "ekbCrimeHeatmapLayer",
      type: "map",
      source: "ekbCrimeLayerSource",
      property: "exident",
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

export const ekbCrimesSource: InputSloySource = {
  id: "ekbCrimeLayerSource",
  path: "/ekb-crime.json",
  type: "geojson",
  coordsProperty: "coords",
  card: {
    title: "address",
    blocks: [
      // { type: "value", id: "ex_type" },
      { type: "tag", id: "exident", title: null },
      { type: "value", id: "descrip" },
      { type: "value", id: "time" },
      {
        type: "datetime",
        id: "date",
        dateTimeFormat: {
          hour: undefined,
          minute: undefined,
        },
      },
      { type: "value", id: "link" },
      { type: "value", id: "link2" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "exident",
      title: "Тип",
      values: {
        пожар: { color: "#ff1962" },
        "коммунальные проблемы": { color: "#dc8a59" },
        "угон машины": { color: "#a094e7" },
        кража: { color: "#506856" },
        "наезд на пешехода": { color: "#439d90" },
        аномалия: { color: "#02e42f" },
        беспорядки: { color: "#5860c0" },
        "территориальный конфликт": { color: "#6286e6" },
        "нападение или драка": { color: "#a18b00" },
        поджог: { color: "#ff857b" },
        труп: { color: "#8189a5" },
        "ограбление организации": { color: "#5d6de4" },
        травма: { color: "#b34cae" },
        вандализм: { color: "#648a30" },
        убийство: { color: "#b144b2" },
        "пропал человек": { color: "#3e57d3" },
        "падение из окна": { color: "#c54485" },
        самоубийство: { color: "#006789" },
        "разбой или грабёж": { color: "#009472" },
        живодёры: { color: "#b7653a" },
        наркотики: { color: "#b49b38" },
        изнасилование: { color: "#777409" },
        "нелегалы или задержания": { color: "#008084" },
      },
    },
    {
      id: "descrip",
      title: "Что произошло",
    },
    {
      id: "time",
      title: "Время",
    },
    {
      id: "date",
      title: "Дата",
    },
    {
      id: "link",
      title: "Источник",
    },
    {
      id: "link2",
      title: "Ещё источник",
    },
  ],
};
