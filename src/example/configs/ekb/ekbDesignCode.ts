import { InputSloyLayer, InputSloySource } from "@/types";

export const ekbDeisgnCode: InputSloyLayer = {
  id: "ekb-design-code",
  title: "«Дизайн-код Екатеринбурга»",
  filters: [
    {
      title: "Объекты",
      type: "string",
      filterVisualizations: ["ekbDesignCodeLayer"],
      source: "ekbDesigncodeSource",
      property: "type",
      totalType: "percent",
      postfix: "шт.",
      totalHeader: "count",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "ekbDesignCodeLayer",
      type: "marker-image",
      source: "ekbDesigncodeSource",
      property: "type",
      rootSrc: "https://map.ekaterinburg.design",
      previewPath: "preview.s.src",
      openable: true,
    },
  ],
};

export const ekbDesignCodeSource: InputSloySource = {
  id: "ekbDesigncodeSource",
  type: "json",
  coordsProperty: "coords",
  isCoordsReverse: true,
  path: "https://map.ekaterinburg.design/api/map",
  copyright: ["ekbDesignCode"],
  card: {
    title: "name",
    cover: "preview.m.src",
    rootSrc: "https://map.ekaterinburg.design",
    description: "description",
    additionalInfo: ["street"],
    blocks: [{ type: "tag", id: "type" }, { type: "divider" }],
  },
  properties: [
    {
      id: "type",
      title: "Тип",
      values: {
        "Обычные адресные таблички": { color: "#ff640a" },
        "Таблички ЧО": { color: "#e63223" },
        "Памятные таблички": { color: "#f758b6" },
        "Исторические адресные таблички": { color: "#aa9b46" },
        "Логотипы и айдентика": { color: "#00b400" },
        "Навигационные стелы": { color: "#ffd400" },
        "Таблички ОКН": { color: "#00b4ff" },
        "Фризы остановок": { color: "#55647d" },
        "Уличная мебель": { color: "#5820e4" },
        Светофор: { color: "#965a14" },
        Транспорт: { color: "#006d4e" },
        "Настенные таблички": { color: "#a00041" },
        "Столбы со стрелками": { color: "#86e621" },
      },
    },
  ],
};
