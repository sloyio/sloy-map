import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsPZZ: InputSloyLayer = {
  id: "gorodets-PZZ",
  title: "ПЗЗ",
  filters: [
    {
      title: "Тип ПЗЗ",
      type: "string[]",
      filterVisualizations: ["gorodetsPZZLineLayer", "gorodetsPZZFillLayer"],
      source: "gorodetsPZZLayerSource",
      property: "type use",
      // totalType: "percent",
      // postfix: "шт.",
      sortType: "config",
    },
  ],
  visualizations: [
    {
      id: "gorodetsPZZLineLayer",
      source: "gorodetsPZZLayerSource",
      openable: true,
      type: "map",
      property: "type use",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 1,
          "line-opacity": 1,
        },
      },
    },
    {
      id: "gorodetsPZZFillLayer",
      source: "gorodetsPZZLayerSource",
      openable: true,
      type: "map",
      property: "type use",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.7,
        },
      },
    },
  ],
};

export const gorodetsPZZSource: InputSloySource = {
  id: "gorodetsPZZLayerSource",
  path: "/gorodets-pzz.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    blocks: [
      { type: "tag", id: "type use" },
      { type: "value", id: "S ha" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "type use",
      title: "Тип ПЗЗ",
      values: {
        "Ж-1": {
          title: "Ж-1",
          color: "#ffe131",
          description: "зона застройки ИЖС",
        },
        "Ж-1А": {
          title: "Ж-1А",
          color: "#ffd900",
          description: "зона застройки ИЖС",
        },
        "Ж-2": {
          title: "Ж-2",
          color: "#ffa903",
          description:
            "зона застройки малоэтажными жилыми домами (до 4 этажей, включая мансардный)",
        },
        "Ж-2А": {
          title: "Ж-2А",
          color: "#d18b00",
          description:
            "зона застройки малоэтажными жилыми домами (до 4 этажей, включая мансардный)",
        },
        "Ж-3": {
          title: "Ж-3",
          color: "#ff5402",
          description:
            "зона застройки среднетажными жилыми домами (5⁠–⁠9 этажей, включая мансардный)",
        },
        "Ж-3А": {
          title: "Ж-3А",
          color: "#cc4100",
          description:
            "зона застройки среднетажными жилыми домами (5⁠–⁠9 этажей, включая мансардный)",
        },
        "Ж-4А": {
          title: "Ж-4А",
          color: "#EB2520",
          description:
            "зона застройки многоэтажными жилыми домами (более 9 этажей, включая мансардный)",
        },
        "Ж-5": {
          title: "Ж-5",
          color: "#acfd06",
          description: "зона СНТ и ОНТ",
        },
        "О-1": {
          title: "О-1",
          color: "#a923ad",
          description: "многофункциональная общественно-деловая зона",
        },
        "О-1А": {
          title: "О-1А",
          color: "#801b83",
          description: "многофункциональная общественно-деловая зона",
        },
        "О-2": {
          title: "О-2",
          color: "#cb79f6",
          description: "зона специализированной общественной застройки",
        },
        "О-2А": {
          title: "О-2А",
          color: "#b74af2",
          description: "зона специализированной общественной застройки",
        },
        "П-4": {
          title: "П-4",
          color: "#885a48",
          description:
            "зона производственно-коммунальных предприятий III⁠–⁠V классов вредности",
        },
        "П-4А": {
          title: "П-4А",
          color: "#684437",
          description:
            "зона производственно-коммунальных предприятий III⁠–⁠V классов вредности",
        },
        "Т-1": {
          title: "Т-1",
          color: "#5439a2",
          description: "зона автомобильного транспорта",
        },
        СХИ: {
          title: "СХИ",
          color: "#edd5ac",
          description: "зоны сельскохозяйственного использования",
        },
        СХН: {
          title: "СХН",
          color: "#cfaa65",
          description: "иные зоны сельскохозяйственного назначения",
        },
        "Р-1": {
          title: "Р-1",
          color: "#03ffc4",
          description: "зоны озеленённых территорий общего пользования",
        },
        "Р-1А": {
          title: "Р-1А",
          color: "#00d1a0",
          description: "зоны озеленённых территорий общего пользования",
        },
        "Р-2": {
          title: "Р-2",
          color: "#8cedb8",
          description: "зона природных ландшафтов",
        },
        "Р-3": {
          title: "Р-3",
          color: "#00af57",
          description: "лесопарковая зона",
        },
        "Р-4": {
          title: "Р-4",
          color: "#53968d",
          description: "зоны рекреационного назначения",
        },
        "Р-5": {
          title: "Р-5",
          color: "#05654d",
          description: "исторические валы",
        },
        Л: {
          title: "Л",
          color: "#1b8f68",
          description: "зоны лесов",
        },
        "СН-1": {
          title: "СН-1",
          color: "#2f4d00",
          description: "зона кладбищ",
        },
        "СН-2": {
          title: "СН-2",
          color: "#66b565",
          description: "зона озеленённых территорий специального назначения",
        },
        В: {
          title: "В",
          color: "#a4cee3",
          description: "зона акваторий",
        },
      },
    },
    {
      id: "S ha",
      title: "Площадь, га",
    },
  ],
};
