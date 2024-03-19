import { InputSloyLayer, InputSloySource } from "@/types";

export const ekbHouseAge: InputSloyLayer = {
  id: "ekb-house-age",
  title: "Возраст домов",
  filters: [
    {
      type: "range",
      filterVisualizations: ["ekbHouseAgeLayer"],
      source: "osmBuilding",
      property: "building:year",
    },
  ],
  visualizations: [
    {
      id: "ekbHouseAgeLayer",
      type: "building-range",
      source: "osmBuilding",
      property: "building:year",
      openable: true,
    },
  ],
};

export const ekbHouseLevels: InputSloyLayer = {
  id: "ekb-house-levels",
  title: "Этажность домов",
  filters: [
    {
      type: "range",
      filterVisualizations: ["ekbHouseLevelsLayer"],
      source: "osmBuilding",
      property: "building:levels",
    },
  ],
  visualizations: [
    {
      id: "ekbHouseLevelsLayer",
      type: "building-range",
      source: "osmBuilding",
      property: "building:levels",
      openable: true,
    },
  ],
};

export const ekbHouseHealth: InputSloyLayer = {
  id: "ekb-house-health",
  title: "Степень износа домов",
  filters: [
    {
      type: "range",
      filterVisualizations: ["ekbHouseHealthLayer"],
      source: "osmBuilding",
      property: "building:health",
    },
  ],
  visualizations: [
    {
      id: "ekbHouseHealthLayer",
      type: "building-range",
      source: "osmBuilding",
      property: "building:health",
      openable: true,
    },
  ],
};

export const ekbHouseSource: InputSloySource = {
  id: "osmBuilding",
  copyright: ["osm", "howoldthishouse", "domaekb", "mingkh"],
  type: "vector-tiles",
  card: {
    title: ["addr:street", "addr:housenumber"],
    blocks: [
      { type: "value", id: "addr:street2" },
      { type: "value", id: "addr:housenumber2" },
      { type: "divider" },
      { type: "value", id: "name" },
      { type: "value", id: "official_name:ru" },
      { type: "value", id: "building:management" },
      { type: "value", id: "operator" },
      { type: "value", id: "addr:postcode" },
      { type: "divider" },
      { type: "value", id: "building:levels" },
      { type: "value", id: "building:height" },
      { type: "divider" },
      { type: "value", id: "building:year" },
      { type: "age", id: "building:age", deps: "building:year" },
      { type: "value", id: "building:series" },
      { type: "value", id: "architect" },
      { type: "value", id: "building:architecture" },
      { type: "value", id: "building:material" },
      { type: "value", id: "building:colour" },
      { type: "value", id: "roof:shape" },
      { type: "divider" },
      { type: "value", id: "building:health" },
      { type: "value", id: "building:condition" },
      { type: "value", id: "building:emergency" },
      { type: "divider" },
      { type: "value", id: "email" },
      { type: "value", id: "phone" },
      { type: "value", id: "website" },
      { type: "value", id: "contact:website" },
    ],
  },
  properties: [
    {
      title: "Когда построили",
      id: "building:year",
      range: [
        { from: 1723, to: 1860, color: "#ff7461", value: 145 },
        { from: 1860, to: 1917, color: "#ffA34e", value: 263 },
        { from: 1917, to: 1930, color: "#fee678", value: 504 },
        { from: 1930, to: 1940, color: "#85e634", value: 718 },
        { from: 1940, to: 1955, color: "#0f9467", value: 2610 },
        { from: 1955, to: 1991, color: "#71b3ff", value: 11895 },
        { from: 1991, to: 2010, color: "#c270ff", value: 3813 },
        { from: 2010, to: 2023, color: "#f97bcf", value: 2807 },
      ],
    },
    {
      title: "Количество этажей",
      id: "building:levels",
      range: [
        { from: 1, to: 3, color: "#006adb", value: 10683 },
        { from: 3, to: 5, color: "#0084e2", value: 2256 },
        { from: 5, to: 9, color: "#009ee1", value: 3399 },
        { from: 9, to: 12, color: "#00b7d9", value: 2115 },
        { from: 12, to: 16, color: "#00cfc5", value: 680 },
        { from: 16, to: 21, color: "#00e7a3", value: 801 },
        { from: 21, to: 25, color: "#72f674", value: 118 },
        { from: 25, to: 31, color: "#c0fc49", value: 282 },
        { from: 31, to: 52, color: "#ffea00", value: 42 },
      ],
    },
    {
      title: "Износ",
      id: "building:health",
      range: [
        { from: 0, to: 10, color: "#006b29", value: 742 },
        { from: 10, to: 20, color: "#24782a", value: 1129 },
        { from: 20, to: 30, color: "#73a426", value: 1246 },
        { from: 30, to: 40, color: "#b6c718", value: 834 },
        { from: 40, to: 50, color: "#e9e005", value: 584 },
        { from: 50, to: 60, color: "#ffea00", value: 284 },
        { from: 60, to: 70, color: "#ffdc00", value: 176 },
        { from: 70, to: 80, color: "#ffbb00", value: 35 },
        { from: 80, to: 90, color: "#ff8a00", value: 5 },
        { from: 90, to: 100, color: "#ff0000", value: 0 },
      ],
    },
    {
      id: "building:facade",
    },
    {
      title: "Osm ID",
      id: "osm:id",
    },
    {
      title: "Улица",
      id: "addr:street",
    },
    {
      title: "Номер дома",
      id: "addr:housenumber",
    },
    {
      title: "Вторая улица",
      id: "addr:street2",
    },
    {
      title: "Второй номер дома",
      id: "addr:housenumber2",
    },
    {
      title: "Управляющая компания",
      id: "building:management",
    },
    {
      title: "Серия дома",
      id: "building:series",
    },
    {
      title: "Состояние",
      id: "building:condition",
    },
    {
      title: "Аварийность",
      id: "building:emergency",
    },
    {
      title: "Возраст здания",
      id: "building:age",
      deps: "building:year",
    },
    {
      title: "Название",
      id: "name",
    },
    {
      title: "Официальное название",
      id: "official_name:ru",
    },
    {
      title: "Почтовый индекс",
      id: "addr:postcode",
    },
    {
      title: "Управляющая компания",
      id: "building:management",
    },
    {
      title: "Оператор",
      id: "operator",
    },
    {
      title: "Время работы",
      id: "opening_hours",
    },
    {
      title: "Тип здания",
      id: "building",
    },
    {
      title: "Высота, м",
      id: "building:height",
    },
    {
      title: "Архитектор",
      id: "architect",
    },
    {
      title: "Архитектурный стиль",
      id: "building:architecture",
    },
    {
      title: "Материал",
      id: "building:material",
    },
    {
      title: "Цвет фасада",
      id: "building:colour",
    },
    {
      title: "Форма крыши",
      id: "roof:shape",
    },
    {
      title: "Электронная почта",
      id: "email",
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
      title: "Сайт",
      id: "contact:website",
    },
  ],
};
