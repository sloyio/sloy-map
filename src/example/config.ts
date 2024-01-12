import { getLayerStyle } from "@/helpers/getLayerStyle";
import { colorLuminance } from "@/helpers/colorLuminance";
import facades from "../../public/ekb-facades.json";
import { MAX_ZOOM, MIN_ZOOM } from "./constants";
import { IApp } from "@/types";

export const state: IApp = {
  copyright: {
    osm: {
      id: "osm",
      name: "OpenStreetMap",
      link: "https://www.openstreetmap.org/",
    },
    okn: {
      id: "okn",
      name: "Объекты культурного наследия Свердловской области",
      link: "https://okn.midural.ru/kategorii/obekty-kulturnogo-naslediya-sverdlovskoy-oblasti",
    },
    howoldthishouse: {
      id: "howoldthishouse",
      name: "Карта возраста домов",
      link: "https://how-old-is-this.house/",
    },
    domaekb: {
      id: "domaekb",
      name: "Жилые дома Екатеринбурга",
      link: "https://domaekb.ru",
    },
    mingkh: {
      id: "mingkh",
      name: "МинЖКХ",
      link: "https://mingkh.ru",
    },
    ekbDesignCode: {
      id: "ekbDesignCode",
      name: "Дизайн-код Ектеринбурга",
      link: "https://ekaterinburg.design",
    },
    dtp: {
      id: "dtp",
      name: "Карта ДТП",
      link: "https://dtp-stat.ru/",
    },
    ekbQuarter: {
      id: "ekbQuarter",
      name: "екатеринбург.рф",
      link: "https://екатеринбург.рф/справка/квартальные",
    },
    ekbDesignCodeMap: {
      id: "ekbDesignCodeMap",
      name: "Карта объектов «Дизайн-кода»",
      link: "https://map.ekaterinburg.design",
    },
  },
  cards: {
    buildingCard: {
      id: "buildingCard",
      title: ["addr:street", "addr:housenumber"],
      blocks: [
        { type: "value", id: "building:management" },
        { type: "value", id: "building:health" },
        { type: "value", id: "building:series" },
        { type: "value", id: "building:levels" },
        { type: "divider" },
        { type: "value", id: "building:year" },
        { type: "age", id: "building:age", deps: "building:year" },
      ],
    },
    oknPointCard: {
      id: "oknPointCard",
      title: "name",
      additionalInfo: ["address"],
      cover: "img",
      blocks: [
        { type: "value", id: "date" },
        { type: "age", id: "age", deps: "date" },
      ],
    },
    ekbLinesCard: {
      id: "ekbLinesCard",
      title: "title",
      blocks: [
        {
          type: "action-link",
          id: "description",
          content: "Подробнее об объекте",
        },
      ],
    },
    ekbDesignCodeCard: {
      id: "ekbDesignCodeCard",
      title: "name",
      cover: "preview.m.src",
      rootSrc: "https://map.ekaterinburg.design",
      description: "description",
      additionalInfo: ["street"],
      blocks: [{ type: "tag", id: "type" }, { type: "divider" }],
    },
    quarterCard: {
      id: "quarterCard",
      title: "quarterTitle",
      blocks: [
        {
          type: "action-link",
          id: "url",
          content: "Посмотреть телефон и почту квартального",
        },
        { type: "divider" },
        { type: "value", id: "districtTitle" },
      ],
    },
    dtpCard: {
      id: "dtpCard",
      title: "category",
      additionalInfo: ["address"],
      blocks: [
        { type: "datetime", id: "datetime" },
        { type: "value", id: "light" },
        { type: "string[]", id: "weather" },
        { type: "string[]", id: "road_conditions" },
      ],
    },
  },
  sources: {
    buildingTile: {
      id: "buildingTile",
      copyright: ["osm", "howoldthishouse", "domaekb", "mingkh"],
      type: "tile",
      card: "buildingCard",
      properties: {
        "building:year": {
          title: "Когда построили",
          id: "building:year",
          values: [
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
        "building:levels": {
          title: "Количество этажей",
          id: "building:levels",
          values: [
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
        "building:health": {
          title: "Износ",
          id: "building:health",
          values: [
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
        "building:facade": {
          id: "building:facade",
        },
        ["osm:id"]: {
          title: "Osm ID",
          id: "osm:id",
        },
        ["addr:street"]: {
          title: "Улица",
          id: "addr:street",
        },
        ["addr:housenumber"]: {
          title: "Номер дома",
          id: "addr:housenumber",
        },
        ["building:management"]: {
          title: "Управляющая компания",
          id: "building:management",
        },
        ["building:series"]: {
          title: "Серия дома",
          id: "building:series",
        },
        ["building:condition"]: {
          title: "Состояние",
          id: "building:condition",
        },
        ["building:emergency"]: {
          title: "Аварийность",
          id: "building:emergency",
        },
        "building:age": {
          id: "age",
          title: "Возраст здания",
          deps: "building:year",
        },
      },
    },
    ekbLinesSource: {
      id: "ekbLinesSource",
      path: "/ekb-color-lines.json",
      type: "geojson",
      copyright: [],
      properties: {
        type: {
          id: "type",
          values: {
            "Красная линия": {
              color: "#e31e24",
              description: "Маршрут по\u00A0историческому центру города",
            },
            "Синяя линия": {
              color: "#189eda",
              description:
                "Маршрут по\u00A0местам, связанным с\u00A0царской семьей",
            },
            "Фиолетовая линия": {
              color: "#9747ff",
              description:
                "Арт-объекты фестиваля уличного искусства «Стенограффия»",
            },
          },
        },
      },
    },
    ekbPointsSource: {
      id: "ekbPointsSource",
      type: "geojson",
      copyright: [],
      path: "/ekb-color-points.json",
      card: "ekbLinesCard",
      properties: {
        description: {
          id: "description",
          title: "Описание",
        },
        type: {
          id: "type",
          values: {
            "Красная линия": {
              color: "#e31e24",
              description: "Маршрут по\u00A0историческому центру города",
            },
            "Синяя линия": {
              color: "#189eda",
              description:
                "Маршрут по\u00A0местам, связанным с\u00A0царской семьей",
            },
            "Фиолетовая линия": {
              color: "#9747ff",
              description:
                "Арт-объекты фестиваля уличного искусства «Стенограффия»",
            },
          },
        },
      },
    },
    ekbDesigncodeSource: {
      id: "ekbDesigncodeSource",
      type: "json",
      coordsProperty: "coords",
      isCoordsReverse: true,
      path: "https://map.ekaterinburg.design/api/map",
      copyright: ["ekbDesignCode"],
      card: "ekbDesignCodeCard",
      properties: {
        type: {
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
      },
    },
    ekbOknSource: {
      id: "ekbOknSource",
      type: "geojson",
      path: "/ekb-okn.json",
      copyright: ["okn"],
      card: "oknPointCard",
      properties: {
        okn_number: {
          title: "Номер",
          id: "okn_number",
        },
        date: {
          id: "date",
          title: "Когда построили",
        },
        age: {
          id: "age",
          title: "Возраст здания",
          deps: "date",
        },
        category: {
          id: "category",
          values: {
            "Федерального значения": { color: "#e65000" },
            "Регионального значения": { color: "#ae00ff" },
            "Местного (муниципального) значения": { color: "#03a600" },
          },
        },
      },
    },
    ekbOknProtectZoneSource: {
      id: "ekbOknProtectZoneSource",
      type: "geojson",
      path: "/ekb-okn-protect.json",
      copyright: ["okn"],
    },
    ekbOknSecurityZoneSource: {
      id: "ekbOknSecurityZoneSource",
      type: "geojson",
      path: "/ekb-okn-security.json",
      copyright: ["okn"],
    },
    ekbOknObjectZoneSource: {
      type: "geojson",
      id: "ekbOknObjectZoneSource",
      path: "/ekb-okn-objects.json",
      copyright: ["okn"],
    },
    ekbDtpSource: {
      id: "ekbDtpSource",
      type: "geojson",
      copyright: ["dtp"],
      card: "dtpCard",
      path: "/ekb-dtp.json",
      dataByIdPath: `/api/dtp?id={DATA_BY_ID}`,
      properties: {
        severity: {
          title: "Вред здоровью",
          id: "severity",
          values: {
            Легкий: { color: "#36ccaa" },
            Тяжёлый: { color: "#fdcf4e" },
            "С погибшими": { color: "#ff0000" },
          },
        },
        datetime: {
          title: "Время",
          id: "datetime",
        },
        light: {
          title: "Время суток",
          id: "light",
        },
        weather: {
          title: "Погода",
          id: "weather",
        },
        road_conditions: {
          title: "Дорожные условия",
          id: "road_conditions",
        },
        address: {
          title: "Адресс",
          id: "address",
        },
        participants: {
          title: "Участники",
          id: "participants",
        },
        participant_categories: {
          title: "Категории",
          id: "participant_categories",
          type: "string[]",
        },
        participants_count: {
          title: "Количество участникиков",
          id: "participants_count",
        },
        vehicles: {
          title: "Транспортные средства",
          id: "vehicles",
        },
        year: {
          title: "Год",
          id: "year",
          values: [
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
      },
    },
    ekbQuarterSource: {
      id: "ekbQuarterSource",
      type: "geojson",
      path: "/ekb-quarters.json",
      copyright: ["ekbQuarter"],
      card: "quarterCard",
      properties: {
        districtTitle: {
          id: "districtTitle",
          title: "Район",
        },
      },
    },
  },
  layers: {
    ekbHouseAge: {
      title: "Возраст домов",
      id: "ekbHouseAge",
      filters: ["ekbHouseAgeFilter"],
      visualisationLayers: ["ekbHouseAgeLayer"],
    },
    ekbHouseLevels: {
      title: "Этажность домов",
      id: "ekbHouseLevels",
      filters: ["ekbHouseLevelsFilter"],
      visualisationLayers: ["ekbHouseLevelsLayer"],
    },
    ekbHouseHealth: {
      title: "Степень износа домов",
      id: "ekbHouseHealth",
      filters: ["ekbHouseHealthFilter"],
      visualisationLayers: ["ekbHouseHealthLayer"],
    },
    okn: {
      title: "Объекты культурного наследния",
      id: "okn",
      filters: [
        "ekbOknObjectsFilter",
        "ekbOknProtectZoneFilter",
        "ekbOknSecurityZoneFilter",
        "ekbOknObjectZoneFilter",
      ],
      visualisationLayers: [
        "ekbOknObjectsLayer",
        "ekbOknProtectZoneLayer",
        "ekbOknSecurityZoneLayer",
        "ekbOknObjectZoneLayer",
        "ekbOknProtectZoneLayerStroke",
        "ekbOknSecurityZoneLayerStroke",
        "ekbOknObjectZoneLayerStroke",
      ],
    },
    ekbDesignCode: {
      title: "«Дизайн-код Екатеринбурга»",
      id: "ekbDesignCode",
      filters: ["ekbDesignCodeFilter"],
      visualisationLayers: ["ekbDesignCodeLayer"],
    },
    dtp: {
      title: "ДТП",
      id: "dtp",
      filters: [
        "ekbDtpDateRangeFilter",
        "ekbDtpSeverityFilter",
        "ekbDtpParticipantsFilter",
      ],
      visualisationLayers: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
    },
    ekbLines: {
      title: "Туристические маршруты",
      id: "ekbLines",
      filters: ["ekbLinesFilter"],
      visualisationLayers: ["ekbLinesLayer", "ekbPointsLayer"],
    },
    ekbQuarter: {
      title: "Квартальные",
      id: "ekbQuarter",
      filters: [],
      visualisationLayers: ["ekbQuarterLayer", "ekbQuarterLayerStroke"],
    },
    ekbFacades: {
      title: "Дизайн-код фасадов",
      id: "ekbFacades",
      filters: [],
      visualisationLayers: ["ekbFacadesLayer"],
    },
  },
  filters: {
    ekbHouseAgeFilter: {
      id: "ekbHouseAgeFilter",
      type: "range",
      filterVisualisationLayers: ["ekbHouseAgeLayer"],
      source: "buildingTile",
      property: "building:year",
    },
    ekbHouseLevelsFilter: {
      id: "ekbHouseLevelsFilter",
      type: "range",
      filterVisualisationLayers: ["ekbHouseLevelsLayer"],
      source: "buildingTile",
      property: "building:levels",
    },
    ekbHouseHealthFilter: {
      id: "ekbHouseHealthFilter",
      type: "range",
      filterVisualisationLayers: ["ekbHouseHealthLayer"],
      source: "buildingTile",
      property: "building:health",
    },
    ekbOknObjectsFilter: {
      id: "ekbOknObjectsFilter",
      type: "string",
      filterVisualisationLayers: ["ekbOknObjectsLayer"],
      source: "ekbOknSource",
      property: "category",
    },
    ekbOknProtectZoneFilter: {
      title: "Защитные зоны",
      color: "#e800b5",
      description:
        "Временная зона в\u00A0100\u2013250 метров вокруг объекта, у\u00A0которого пока не\u00A0указана зона охраны",

      id: "ekbOknProtectZoneFilter",
      type: "boolean",
      filterVisualisationLayers: [
        "ekbOknProtectZoneLayer",
        "ekbOknProtectZoneLayerStroke",
      ],
      source: "ekbOknProtectZoneSource",
      property: "?",
    },
    ekbOknSecurityZoneFilter: {
      title: "Зоны охраны ОКН",
      color: "#00b4ff",
      description:
        "Территории, в\u00A0пределах которых запрещены любые работы, так как они могут причинить вред объекту",

      id: "ekbOknSecurityZoneFilter",
      type: "boolean",
      filterVisualisationLayers: [
        "ekbOknSecurityZoneLayer",
        "ekbOknSecurityZoneLayerStroke",
      ],
      source: "ekbOknSecurityZoneSource",
      property: "?",
    },
    ekbOknObjectZoneFilter: {
      title: "Границы территорий ОКН",
      color: "#ff640f",
      description:
        "Объект культурного наследия и\u00A0неотделимая от\u00A0него территория",

      id: "ekbOknObjectZoneFilter",
      type: "boolean",
      filterVisualisationLayers: [
        "ekbOknObjectZoneLayer",
        "ekbOknObjectZoneLayerStroke",
      ],
      source: "ekbOknObjectZoneSource",
      property: "?",
    },
    ekbDtpDateRangeFilter: {
      id: "ekbDtpDateRangeFilter",
      type: "range",
      filterVisualisationLayers: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
      source: "ekbDtpSource",
      property: "year",
    },
    ekbDtpSeverityFilter: {
      title: "Вред здоровью",
      id: "ekbDtpSeverityFilter",
      type: "string",
      filterVisualisationLayers: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
      source: "ekbDtpSource",
      property: "severity",
    },
    ekbDtpParticipantsFilter: {
      title: "Участник ДТП",
      id: "ekbDtpParticipantsFilter",
      type: "string[]",
      filterVisualisationLayers: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
      source: "ekbDtpSource",
      property: "participant_categories",
    },
    ekbLinesFilter: {
      id: "ekbLinesFilter",
      type: "string",
      filterVisualisationLayers: ["ekbPointsLayer", "ekbLinesLayer"],
      source: "ekbPointsSource",
      property: "type",
    },
    ekbDesignCodeFilter: {
      id: "ekbDesignCodeFilter",
      type: "string",
      filterVisualisationLayers: ["ekbDesignCodeLayer"],
      source: "ekbDesigncodeSource",
      property: "type",
    },
  },
  visualisationLayers: {
    ekbOknObjectsLayer: {
      id: "ekbOknObjectsLayer",
      type: "circle",
      source: "ekbOknSource",
      property: "category",
      openable: true,
      paint: {
        "circle-stroke-width": 1,
        // 'circle-radius': getLayerStyle<number>({ initial: 8, hover: 10, active: 12 }),
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
    ekbOknProtectZoneLayer: {
      id: "ekbOknProtectZoneLayer",
      type: "fill",
      source: "ekbOknProtectZoneSource",
      paint: {
        "fill-color": "#e800b5",
        "fill-opacity": 0.2,
      },
    },
    ekbOknProtectZoneLayerStroke: {
      id: "ekbOknProtectZoneLayerStroke",
      type: "line",
      source: "ekbOknProtectZoneSource",
      paint: {
        "line-color": "#e800b5",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          MIN_ZOOM,
          0.1,
          MAX_ZOOM,
          3,
        ],
        "line-dasharray": [2, 2],
      },
    },
    ekbOknSecurityZoneLayer: {
      id: "ekbOknSecurityZoneLayer",
      type: "fill",
      source: "ekbOknSecurityZoneSource",
      paint: {
        "fill-color": "#00b4ff",
        "fill-opacity": 0.2,
      },
    },
    ekbOknSecurityZoneLayerStroke: {
      id: "ekbOknSecurityZoneLayerStroke",
      type: "line",
      source: "ekbOknSecurityZoneSource",
      paint: {
        "line-color": "#00b4ff",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          MIN_ZOOM,
          0.1,
          MAX_ZOOM,
          3,
        ],
        "line-dasharray": [2, 2],
      },
    },
    ekbOknObjectZoneLayer: {
      id: "ekbOknObjectZoneLayer",
      type: "fill",
      source: "ekbOknObjectZoneSource",
      paint: {
        "fill-color": "#ff640f",
        "fill-opacity": 0.2,
      },
    },
    ekbOknObjectZoneLayerStroke: {
      id: "ekbOknObjectZoneLayerStroke",
      type: "line",
      source: "ekbOknObjectZoneSource",
      paint: {
        "line-color": "#ff640f",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          MIN_ZOOM,
          0.1,
          MAX_ZOOM,
          3,
        ],
        "line-dasharray": [2, 2],
      },
    },
    ekbDtpPointsLayer: {
      id: "ekbDtpPointsLayer",
      type: "circle",
      source: "ekbDtpSource",
      property: "severity",
      openable: true,
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
    ekbDtpHeatmapLayer: {
      id: "ekbDtpHeatmapLayer",
      type: "heatmap",
      source: "ekbDtpSource",
      property: "severity",
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
    ekbHouseAgeLayer: {
      id: "ekbHouseAgeLayer",
      type: "building-range",
      source: "buildingTile",
      paint: {},
      property: "building:year",
      openable: true,
    },
    ekbHouseLevelsLayer: {
      id: "ekbHouseLevelsLayer",
      type: "building-range",
      source: "buildingTile",
      paint: {},
      property: "building:levels",
      openable: true,
    },
    ekbHouseHealthLayer: {
      id: "ekbHouseHealthLayer",
      type: "building-range",
      source: "buildingTile",
      paint: {},
      property: "building:health",
      openable: true,
    },
    ekbLinesLayer: {
      id: "ekbLinesLayer",
      type: "line",
      source: "ekbLinesSource",
      property: "type",
      paint: {
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          MIN_ZOOM,
          1,
          MAX_ZOOM,
          3,
        ],
      },
    },
    ekbPointsLayer: {
      id: "ekbPointsLayer",
      type: "circle",
      source: "ekbPointsSource",
      property: "type",
      openable: true,
      paint: {
        "circle-stroke-width": 1,
        // 'circle-radius': getLayerStyle<number>({ initial: 8, hover: 10, active: 12 }),
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
    ekbQuarterLayer: {
      id: "ekbQuarterLayer",
      type: "fill",
      source: "ekbQuarterSource",
      openable: true,
      paint: {
        "fill-color": getLayerStyle<string>({
          initial: "#9AADCC",
          hover: colorLuminance("#9AADCC", 0.2),
          active: colorLuminance("#9AADCC", 0.4),
        }),
        "fill-opacity": 0.6,
      },
    },
    ekbQuarterLayerStroke: {
      id: "ekbQuarterLayerStroke",
      source: "ekbQuarterSource",
      type: "line",
      openable: true,
      paint: {
        "line-color": "#000",
        "line-opacity": 0.5,
        "line-width": 1.5,
      },
    },
    ekbDesignCodeLayer: {
      id: "ekbDesignCodeLayer",
      type: "marker-image",
      source: "ekbDesigncodeSource",
      property: "type",
      rootSrc: "https://map.ekaterinburg.design",
      previewPath: "preview.s.src",
      openable: true,
      paint: {},
    },
    ekbFacadesLayer: {
      id: "ekbFacadesLayer",
      type: "building-ids",
      source: "buildingTile",
      ids: Object.keys(facades),
      openable: true,
      paint: {
        "fill-extrusion-color": getLayerStyle<string>({
          initial: "rgba(129, 255, 0, 0.75)",
          hover: "rgba(129, 255, 0, 0.90)",
          active: "rgba(129, 255, 0, 1)",
        }),
      },
    },
  },
};
