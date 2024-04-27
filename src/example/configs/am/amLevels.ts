import { InputSloyLayer, InputSloySource } from "@/types";
import { YEREVAN_VIEW } from "../../constants";

export const amLevels: InputSloyLayer = {
  id: "am-levels",
  title: "Этажность домов",
  description:
    "Этажность зданий Армении, данные о которых есть в OpenStreetMaps.",
  initialViewState: YEREVAN_VIEW,
  updatedAt: "2023-02-13T21:00:00.000Z",
  license: "ODbL",
  link: {
    href: "https://www.openstreetmap.org/#map=8/40.082/45.040",
    label: "Источник",
  },
  filters: [
    {
      type: "range",
      filterVisualizations: ["houseLevelsLayer"],
      source: "osmSource",
      property: "building:levels",
    },
  ],
  visualizations: [
    {
      id: "houseLevelsLayer",
      type: "building-range",
      source: "osmSource",
      property: "building:levels",
      openable: true,
    },
  ],
};

export const amLevelsSource: InputSloySource = {
  id: "osmSource",
  vectorLayer: "building",
  copyright: ["osm"],
  type: "vector-tiles",
  card: {
    title: ["addr:street", "addr:housenumber"],
    blocks: [
      { type: "value", id: "name" },
      { type: "value", id: "name:en" },
      { type: "value", id: "name:ru" },
      { type: "divider" },
      { type: "value", id: "building:management" },
      { type: "value", id: "building:health" },
      { type: "value", id: "building:series" },
      { type: "value", id: "building:levels" },
      { type: "value", id: "extrusion:height" },
      { type: "value", id: "start_date" },
      { type: "age", id: "building:age", deps: "start_date" },
      { type: "divider" },
      { type: "value", id: "addr:postcode" },
      { type: "value", id: "amenity" },
      { type: "value", id: "phone" },
      { type: "value", id: "website" },
    ],
  },
  properties: [
    {
      title: "Название на армянском",
      id: "name",
    },
    {
      title: "Название на английском",
      id: "name:en",
    },
    {
      title: "Название на русском",
      id: "name:ru",
    },
    {
      title: "Когда построили",
      id: "start_date",
    },
    {
      title: "Количество этажей",
      id: "building:levels",
      range: [
        { from: 1, to: 2, color: "#006adb", value: 6544 },
        { from: 2, to: 3, color: "#0084e2", value: 5193 },
        { from: 3, to: 5, color: "#009ee1", value: 3200 },
        { from: 5, to: 7, color: "#00b7d9", value: 3234 },
        { from: 7, to: 9, color: "#00cfc5", value: 198 },
        { from: 9, to: 12, color: "#00e7a3", value: 1930 },
        { from: 12, to: 16, color: "#72f674", value: 664 },
        { from: 16, to: 20, color: "#c0fc49", value: 320 },
        { from: 20, to: 25, color: "#ffea00", value: 10 },
      ],
    },
    {
      title: "Высота, м",
      id: "extrusion:height",
    },
    {
      title: "Почтовый индекс",
      id: "addr:postcode",
    },
    {
      title: "Удобства",
      id: "amenity",
    },
    {
      title: "Телефон",
      id: "phone",
    },
    {
      title: "Сайт",
      id: "website",
    },
    {
      id: "osm:id",
      title: "Osm ID",
    },
    {
      id: "addr:street",
      title: "Улица",
    },
    {
      id: "addr:housenumber",
      title: "Номер дома",
    },
    {
      id: "age",
      title: "Возраст здания",
      deps: "start_date",
    },
    {
      id: "building:age",
      title: "Возраст здания",
    },
  ],
};
