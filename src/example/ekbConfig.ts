import { getLayerStyle } from "@/helpers/getLayerStyle";
import facades from "../../public/ekb-facades.json";
import { MAX_ZOOM, MIN_ZOOM } from "./constants";

export const defaultSources = [
  {
    id: "buildingTile",
    copyright: ["osm", "howoldthishouse", "domaekb", "mingkh"],
    type: "tile",
    card: {
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
    properties: [
      {
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
      {
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
      {
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
        id: "age",
        title: "Возраст здания",
        deps: "building:year",
      },
    ],
  },
  {
    id: "ekbLinesSource",
    path: "/ekb-color-lines.json",
    type: "geojson",
    card: { blocks: [] },
    copyright: [],
    properties: [
      {
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
    ],
  },
  {
    id: "ekbPointsSource",
    type: "geojson",
    copyright: [],
    path: "/ekb-color-points.json",
    card: {
      title: "title",
      blocks: [
        {
          type: "action-link",
          id: "description",
          content: "Подробнее об объекте",
        },
      ],
    },
    properties: [
      {
        id: "description",
        title: "Описание",
      },
      {
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
    ],
  },
  {
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
  },
  {
    id: "ekbOknSource",
    type: "geojson",
    path: "/ekb-okn.json",
    copyright: ["okn"],
    card: {
      title: "name",
      additionalInfo: ["address"],
      cover: "img",
      blocks: [
        { type: "value", id: "date" },
        { type: "age", id: "age", deps: "date" },
      ],
    },
    properties: [
      {
        title: "Номер",
        id: "okn_number",
      },
      {
        id: "date",
        title: "Когда построили",
      },
      {
        id: "age",
        title: "Возраст здания",
        deps: "date",
      },
      {
        id: "category",
        values: {
          "Федерального значения": { color: "#e65000" },
          "Регионального значения": { color: "#ae00ff" },
          "Местного (муниципального) значения": { color: "#03a600" },
        },
      },
    ],
  },
  {
    id: "ekbOknProtectZoneSource",
    type: "geojson",
    card: { blocks: [] },
    properties: [],
    path: "/ekb-okn-protect.json",
    copyright: ["okn"],
  },
  {
    id: "ekbOknSecurityZoneSource",
    type: "geojson",
    card: { blocks: [] },
    properties: [],
    path: "/ekb-okn-security.json",
    copyright: ["okn"],
  },
  {
    type: "geojson",
    card: { blocks: [] },
    properties: [],
    id: "ekbOknObjectZoneSource",
    path: "/ekb-okn-objects.json",
    copyright: ["okn"],
  },
  {
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
    path: "/ekb-dtp.json",
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
    ],
  },
  {
    id: "ekbQuarterSource",
    type: "geojson",
    path: "/ekb-quarters.json",
    copyright: ["ekbQuarter"],
    card: {
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
    properties: [
      {
        id: "districtTitle",
        title: "Район",
      },
    ],
  },
];

export const defaultLayers = [
  {
    title: "Возраст домов",
    filters: [
      {
        type: "range",
        filterVisualisationLayers: ["ekbHouseAgeLayer"],
        source: "buildingTile",
        property: "building:year",
      },
    ],
    visualisationLayers: [
      {
        id: "ekbHouseAgeLayer",
        type: "building-range",
        source: "buildingTile",
        paint: {},
        property: "building:year",
        openable: true,
      },
    ],
  },
  {
    title: "Этажность домов",
    filters: [
      {
        type: "range",
        filterVisualisationLayers: ["ekbHouseLevelsLayer"],
        source: "buildingTile",
        property: "building:levels",
      },
    ],
    visualisationLayers: [
      {
        id: "ekbHouseLevelsLayer",
        type: "building-range",
        source: "buildingTile",
        paint: {},
        property: "building:levels",
        openable: true,
      },
    ],
  },
  {
    title: "Степень износа домов",
    filters: [
      {
        type: "range",
        filterVisualisationLayers: ["ekbHouseHealthLayer"],
        source: "buildingTile",
        property: "building:health",
      },
    ],
    visualisationLayers: [
      {
        id: "ekbHouseHealthLayer",
        type: "building-range",
        source: "buildingTile",
        paint: {},
        property: "building:health",
        openable: true,
      },
    ],
  },
  {
    title: "Объекты культурного наследния",
    filters: [
      {
        type: "string",
        filterVisualisationLayers: ["ekbOknObjectsLayer"],
        source: "ekbOknSource",
        property: "category",
      },
      {
        title: "Защитные зоны",
        color: "#e800b5",
        description:
          "Временная зона в\u00A0100\u2013250 метров вокруг объекта, у\u00A0которого пока не\u00A0указана зона охраны",

        type: "boolean",
        filterVisualisationLayers: [
          "ekbOknProtectZoneLayer",
          "ekbOknProtectZoneLayerStroke",
        ],
        source: "ekbOknProtectZoneSource",
        property: "?",
      },
      {
        title: "Зоны охраны ОКН",
        color: "#00b4ff",
        description:
          "Территории, в\u00A0пределах которых запрещены любые работы, так как они могут причинить вред объекту",

        type: "boolean",
        filterVisualisationLayers: [
          "ekbOknSecurityZoneLayer",
          "ekbOknSecurityZoneLayerStroke",
        ],
        source: "ekbOknSecurityZoneSource",
        property: "?",
      },
      {
        title: "Границы территорий ОКН",
        color: "#ff640f",
        description:
          "Объект культурного наследия и\u00A0неотделимая от\u00A0него территория",
        type: "boolean",
        filterVisualisationLayers: [
          "ekbOknObjectZoneLayer",
          "ekbOknObjectZoneLayerStroke",
        ],
        source: "ekbOknObjectZoneSource",
        property: "?",
      },
    ],
    visualisationLayers: [
      {
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
      {
        id: "ekbOknProtectZoneLayer",
        type: "fill",
        source: "ekbOknProtectZoneSource",
        paint: {
          "fill-color": "#e800b5",
          "fill-opacity": 0.2,
        },
      },
      {
        id: "ekbOknSecurityZoneLayer",
        type: "fill",
        source: "ekbOknSecurityZoneSource",
        paint: {
          "fill-color": "#00b4ff",
          "fill-opacity": 0.2,
        },
      },
      {
        id: "ekbOknObjectZoneLayer",
        type: "fill",
        source: "ekbOknObjectZoneSource",
        paint: {
          "fill-color": "#ff640f",
          "fill-opacity": 0.2,
        },
      },
      {
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
      {
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
      {
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
    ],
  },
  {
    title: "«Дизайн-код Екатеринбурга»",
    filters: [
      {
        type: "string",
        filterVisualisationLayers: ["ekbDesignCodeLayer"],
        source: "ekbDesigncodeSource",
        property: "type",
      },
    ],
    visualisationLayers: [
      {
        id: "ekbDesignCodeLayer",
        type: "marker-image",
        source: "ekbDesigncodeSource",
        property: "type",
        rootSrc: "https://map.ekaterinburg.design",
        previewPath: "preview.s.src",
        openable: true,
        paint: {},
      },
    ],
  },
  {
    title: "ДТП",
    filters: [
      {
        type: "range",
        filterVisualisationLayers: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
        source: "ekbDtpSource",
        property: "year",
      },
      {
        title: "Вред здоровью",
        type: "string",
        filterVisualisationLayers: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
        source: "ekbDtpSource",
        property: "severity",
      },
      {
        title: "Участник ДТП",
        type: "string[]",
        filterVisualisationLayers: ["ekbDtpPointsLayer", "ekbDtpHeatmapLayer"],
        source: "ekbDtpSource",
        property: "participant_categories",
      },
    ],
    visualisationLayers: [
      {
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
      {
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
    ],
  },
  {
    title: "Туристические маршруты",
    filters: [
      {
        type: "string",
        filterVisualisationLayers: ["ekbPointsLayer", "ekbLinesLayer"],
        source: "ekbPointsSource",
        property: "type",
      },
    ],
    visualisationLayers: [
      {
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
      {
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
    ],
  },
  {
    title: "Квартальные",
    filters: [],
    visualisationLayers: [
      {
        id: "ekbQuarterLayer",
        type: "fill",
        source: "ekbQuarterSource",
        openable: true,
        paint: {
          "fill-color": "#9AADCC",
          "fill-opacity": 0.6,
        },
      },
      {
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
    ],
  },
  {
    title: "Дизайн-код фасадов",
    filters: [],
    visualisationLayers: [
      {
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
    ],
  },
];

const EKB_VIEW = {
  center: [60.6, 56.838],
  zoom: 14.5,
  pitch: 20,
  bearing: 0,
};

export const defaultMapState = {
  initialViewState: {
    ...EKB_VIEW,
    longitude: EKB_VIEW.center[0],
    latitude: EKB_VIEW.center[1],
  },
  mapStyle: "/ekb-dark-map-style.json",
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  // maxBounds: [40.721512, 37.51153, 49.609451, 42.222066],
};

export const state = {
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
};
