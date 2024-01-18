import { createAppState } from "@/helpers/createAppState";
import { createLayer } from "@/helpers/createLayer";
import { createSources } from "@/helpers/createSources";
import { MAX_ZOOM, MIN_ZOOM } from "./constants";

const OSM_BUILDINGS = createSources([
  {
    id: "buildingTile",
    copyright: [],
    type: "tile",
    card: {
      title: ["addr:street", "addr:housenumber"],
      blocks: [
        { type: "value", id: "building:management" },
        { type: "value", id: "building:health" },
        { type: "value", id: "building:series" },
        { type: "value", id: "building:levels" },
        { type: "divider" },
        { type: "value", id: "start_date" },
        { type: "age", id: "building:age", deps: "start_date" },
      ],
    },
    properties: [
      {
        title: "Когда построили",
        id: "start_date",
        values: [
          { from: 1723, to: 1860, color: "#ff7461", value: 0 },
          { from: 1860, to: 1917, color: "#ffA34e", value: 1 },
          { from: 1917, to: 1930, color: "#fee678", value: 1 },
          { from: 1930, to: 1940, color: "#85e634", value: 1 },
          { from: 1940, to: 1955, color: "#0f9467", value: 0 },
          { from: 1955, to: 1991, color: "#71b3ff", value: 7 },
          { from: 1991, to: 2010, color: "#c270ff", value: 4 },
          { from: 2010, to: 2023, color: "#f97bcf", value: 6 },
        ],
      },
      {
        title: "Количество этажей",
        id: "building:levels",
        values: [
          { from: 1, to: 3, color: "#006adb", value: 11656 },
          { from: 3, to: 5, color: "#0084e2", value: 3172 },
          { from: 5, to: 9, color: "#009ee1", value: 3380 },
          { from: 9, to: 12, color: "#00b7d9", value: 1929 },
          { from: 12, to: 16, color: "#00cfc5", value: 664 },
          { from: 16, to: 21, color: "#00e7a3", value: 320 },
          { from: 21, to: 25, color: "#72f674", value: 8 },
          { from: 25, to: 31, color: "#c0fc49", value: 0 },
          { from: 31, to: 52, color: "#ffea00", value: 0 },
        ],
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
    ],
  },
]);

export const state = createAppState([
  {
    mapState: {
      locale: "ru-RU",
      initialViewState: {
        latitude: 40.18001,
        longitude: 44.52656,
        zoom: 14,
        pitch: 0,
      },
      mapStyle: "/sloy-dark-map-style.json",
    },
    ...OSM_BUILDINGS,
  },
  createLayer(
    {
      title: "Этажность домов",
      defaultZoom: 14,
      filters: [
        {
          type: "range",
          filterVisualisationLayers: ["houseLevelsLayer"],
          source: "buildingTile",
          property: "building:levels",
        },
      ],
      visualisationLayers: [
        {
          id: "houseLevelsLayer",
          type: "building-range",
          source: "buildingTile",
          paint: {},
          property: "building:levels",
          openable: true,
        },
      ],
    },
    [],
  ),
  createLayer(
    {
      title: "Возраст домов",
      defaultZoom: 14,
      filters: [
        {
          type: "range",
          filterVisualisationLayers: ["houseAgeLayer"],
          source: "buildingTile",
          property: "start_date",
        },
      ],
      visualisationLayers: [
        {
          id: "houseAgeLayer",
          type: "building-range",
          source: "buildingTile",
          paint: {},
          property: "start_date",
          openable: true,
        },
      ],
    },
    [],
  ),
  createLayer(
    {
      title: "Почтовые отделения",
      defaultZoom: 10,
      filters: [],
      visualisationLayers: [
        {
          id: "armenianPostBranchesLayer",
          type: "circle",
          source: "armenianPostBranchesLayerSource",
          openable: true,
          paint: {
            "circle-color": "#f18f00",
            "circle-stroke-width": 1,
            // 'circle-radius': getLayerStyle<number>({ initial: 8, hover: 10, active: 12 }),
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
      ],
    },
    [
      {
        id: "armenianPostBranchesLayerSource",
        path: "/postalindex_ru.json",
        type: "json",
        card: {
          title: "address",
          blocks: [
            { type: "value", id: "work_days" },
            { type: "value", id: "postal_code" },
          ],
        },
        copyright: [],
        properties: [
          {
            id: "work_days",
            title: "Рабочее время",
          },
          {
            id: "postal_code",
            title: "Почтовый код",
          },
        ],
        latProperty: "lat",
        lngProperty: "long",
      },
    ],
  ),
  createLayer(
    {
      title: "Радиационный баланс",
      defaultZoom: 8,
      filters: [
        {
          property: "VALUE",
          type: "string",
          filterVisualisationLayers: ["armenianRadiationBalanceLayer"],
          source: "armenianRadiationBalanceLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianRadiationBalanceLayer",
          source: "armenianRadiationBalanceLayerSource",
          openable: true,
          type: "fill",
          property: "VALUE",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
        id: "armenianRadiationBalanceLayerSource",
        path: "/radiation_bal.json",
        type: "geojson",
        projection: "EPSG:28408",
        card: {
          blocks: [
            {
              type: "value",
              id: "VALUE",
            },
            { type: "value", id: "UNIT" },
          ],
        },
        properties: [
          {
            id: "VALUE",
            title: "Значение",
            values: {
              40: { color: "#fddede" },
              45: { color: "#feb7b9" },
              50: { color: "#fd9793" },
              55: { color: "#fd906c" },
              60: { color: "#f57a4e" },
              65: { color: "#e75338" },
              70: { color: "#cf2b1c" },
            },
          },
          {
            id: "UNIT",
            title: "Единицы измерения",
          },
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Сейсмические зоны",
      defaultZoom: 8,
      filters: [
        {
          property: "Zone",
          type: "string",
          filterVisualisationLayers: ["armenianSeismicZonesLayer"],
          source: "armenianSeismicZonesLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianSeismicZonesLayer",
          source: "armenianSeismicZonesLayerSource",
          openable: true,
          type: "fill",
          property: "Zone",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
        id: "armenianSeismicZonesLayerSource",
        path: "/seismic_zones.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          blocks: [
            {
              type: "value",
              id: "Zone",
            },
            {
              type: "value",
              id: "Area_km2",
            },
            { type: "value", id: "Zone_g" },
          ],
        },
        properties: [
          {
            id: "Area_km2",
            title: "Площадь, км²",
          },
          {
            id: "Zone",
            title: "Площадь, км²",
            values: {
              I: {
                color: "#f4dc70",
              },
              II: {
                color: "#fdbb60",
              },
              III: {
                color: "#d8010a",
              },
            },
          },
          {
            id: "Zone_g",
            title: "Площадь, км²",
          },
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Типы растительности",
      defaultZoom: 8,
      filters: [
        {
          property: "Veget_zone",
          type: "string",
          filterVisualisationLayers: ["armenianVegetationTypesLayer"],
          source: "armenianVegetationTypesLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianVegetationTypesLayer",
          source: "armenianVegetationTypesLayerSource",
          openable: true,
          type: "fill",
          property: "Veget_zone",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
        id: "armenianVegetationTypesLayerSource",
        path: "/vegetation_types.json",
        type: "geojson",
        projection: "EPSG:28408",
        card: {
          blocks: [
            {
              type: "value",
              id: "Area",
            },
            {
              type: "value",
              id: "Veget_zone",
            },
            { type: "value", id: "ZoneID" },
          ],
        },
        properties: [
          {
            id: "Area",
            title: "Площадь, км²",
          },
          {
            id: "Veget_zone",
            title: "Зона",
            values: {
              "Alpine medows and dense turf formations": {
                color: "#02e409",
              },
              "Beech, oak and hornbeam forests": {
                color: "#1fa000",
              },
              "Cereal and motley grass steppe with  tragacanth": {
                color: "#ceea80",
              },
              "Coniferous and deciduous sparse trees": {
                color: "#187403",
              },
              "Forests  of eastern oak": {
                color: "#2dc61e",
              },
              "Grassland steppe": {
                color: "#b9e44b",
              },
              "Halophilous deserts (halophytic and others)": {
                color: "#ecf778",
              },
              "Lake Arpilich": {
                color: "#3196ff",
              },
              "Lake Sevan": {
                color: "#3196ff",
              },
              "Lower alpine medows": {
                color: "#95eb6f",
              },
              "Mixed oak and hornbeam forests": {
                color: "#5bae75",
              },
              "Psammophilous deserts": {
                color: "#e3d612",
              },
              "Vegetation of exposed soils": {
                color: "#95aba8",
              },
              "Water-marsh vegetation": {
                color: "#87d4b4",
              },
              "Wormwood semi-deserts (sweet wormwood)": {
                color: "#e9da81",
              },
              "Xerophilous bushes and grasses": {
                color: "#c9d05f",
              },
            },
          },
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Ветровые ресурсы",
      defaultZoom: 8,
      filters: [
        {
          property: "Wind_Speed",
          type: "string",
          filterVisualisationLayers: ["armenianWindResourcesLayer"],
          source: "armenianWindResourcesLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianWindResourcesLayer",
          source: "armenianWindResourcesLayerSource",
          openable: true,
          type: "fill",
          property: "Wind_Speed",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
        id: "armenianWindResourcesLayerSource",
        path: "/wind_resources.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          blocks: [
            {
              type: "value",
              id: "Utility",
            },
            {
              type: "value",
              id: "Wind_Speed",
            },
          ],
        },
        properties: [
          {
            id: "Utility",
            title: "Скорость ветра",
          },
          {
            id: "Wind_Speed",
            title: "Сила ветра",
            values: {
              "0 - 6.0": {
                color: "rgba(255,255,255,.2)",
              },
              "6.8 - 6.8": {
                color: "#feaf77",
              },
              "7.5 - 8.1": {
                color: "#f1605d",
              },
              "8.1 - 8.6": {
                color: "#b63679",
              },
              "8.6 - 9.5": {
                color: "#721f81",
              },
              ">9.5": {
                color: "#2d115f",
              },
            },
          },
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Озера и Водохранилища",
      defaultZoom: 8,
      filters: [],
      visualisationLayers: [
        {
          id: "armenianLakesAndReservoirsLayer",
          source: "armenianLakesAndReservoirsSource",
          openable: true,
          type: "fill",
          property: "LKcode",
          paint: {
            "fill-opacity": 0.6,
            "fill-color": "#000088",
          },
        },
      ],
    },
    [
      {
        id: "armenianLakesAndReservoirsSource",
        path: "/lakes_and_reservoirs.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          blocks: [],
        },
        properties: [],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Оползни",
      defaultZoom: 8,
      filters: [],
      visualisationLayers: [
        {
          id: "armenianLandslidesLayer",
          source: "armenianLandslidesLayerSource",
          openable: true,
          type: "fill",
          property: "",
          paint: {
            "fill-opacity": 0.6,
            "fill-color": "#891900",
          },
        },
      ],
    },
    [
      {
        id: "armenianLandslidesLayerSource",
        path: "/lakes_and_reservoirs.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          title: "Name_eng",
          blocks: [],
        },
        properties: [],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Среднегодовой уровень солнечной радиации",
      defaultZoom: 8,
      filters: [
        {
          property: "Sun_radiat",
          type: "string",
          filterVisualisationLayers: ["armenianSolarRadiationLevelLayer"],
          source: "armenianSolarRadiationLevelLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianSolarRadiationLevelLayer",
          source: "armenianSolarRadiationLevelLayerSource",
          openable: true,
          type: "fill",
          property: "Sun_radiat",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
        id: "armenianSolarRadiationLevelLayerSource",
        path: "/solar_radiation_level.json",
        type: "geojson",
        projection: "EPSG:28408",
        card: {
          blocks: [
            {
              type: "value",
              id: "Sun_radiat",
            },
          ],
        },
        properties: [
          {
            id: "Sun_radiat",
            title: "Уровень радиации",
            values: {
              115: {
                color: "#ffffb2",
              },
              120: {
                color: "#ffeb90",
              },
              125: {
                color: "#ffd76d",
              },
              130: {
                color: "#fec055",
              },
              135: {
                color: "#fea649",
              },
              140: {
                color: "#fd8d3c",
              },
              145: {
                color: "#f86c30",
              },
              150: {
                color: "#f34b25",
              },
              155: {
                color: "#e62f21",
              },
              160: {
                color: "#d21723",
              },
              165: {
                color: "#bd0026",
              },
            },
          },
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Среднегодовой уровень осадков",
      defaultZoom: 8,
      filters: [
        {
          property: "Precipitat",
          type: "string",
          filterVisualisationLayers: ["armenianPrecipitationsLevelLayer"],
          source: "armenianPrecipitationsLevelLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianPrecipitationsLevelLayer",
          source: "armenianPrecipitationsLevelLayerSource",
          openable: true,
          type: "fill",
          property: "Precipitat",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
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
          ],
        },
        properties: [
          {
            id: "Precipitat",
            title: "Уровень осадков",
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
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Среднегодовая температура",
      defaultZoom: 8,
      filters: [
        {
          property: "Temperatur",
          type: "string",
          filterVisualisationLayers: ["armenianTemperatureLayer"],
          source: "armenianTemperatureLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianTemperatureLayer",
          source: "armenianTemperatureLayerSource",
          openable: true,
          type: "fill",
          property: "Temperatur",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
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
          ],
        },
        properties: [
          {
            id: "Temperatur",
            title: "Среднегодовая температура",
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
              1: {
                color: "#fcaf93",
              },
              3: {
                color: "#fc8f6f",
              },
              5: {
                color: "#fc7050",
              },
              7: {
                color: "#f44d37",
              },
              9: {
                color: "#e22d26",
              },
              11: {
                color: "#c5161b",
              },
              13: {
                color: "#a50f15",
              },
              15: {
                color: "#67000d",
              },
            },
          },
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Землепользование",
      defaultZoom: 8,
      filters: [
        {
          property: "Landuse",
          type: "string",
          filterVisualisationLayers: ["armenianLandUseLayer"],
          source: "armenianLandUseLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianLandUseLayer",
          source: "armenianLandUseLayerSource",
          openable: true,
          type: "fill",
          property: "Landuse",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
        id: "armenianLandUseLayerSource",
        path: "/land_use.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          blocks: [
            {
              type: "value",
              id: "Landuse",
            },
            {
              type: "value",
              id: "Shape_Area",
            },
          ],
        },
        properties: [
          {
            id: "Landuse",
            title: "Землепользование",
            values: {
              "": {
                color: "rgba(255,255,255,.2)",
              },
              "Arable land": {
                color: "#fdad51",
              },
              Crops: {
                color: "#a06525",
              },
              "Forest, shrubland": {
                color: "#217c16",
              },
              Grassland: {
                color: "#5dba26",
              },
              "Lakes, reservoirs": {
                color: "#a5bfdd",
              },
              Pastures: {
                color: "#81fb44",
              },
              "Yerevan city": {
                color: "#eb3a09",
              },
            },
          },
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Типы почвы",
      defaultZoom: 8,
      filters: [
        {
          property: "Descriptio",
          type: "string",
          filterVisualisationLayers: ["armenianSoilTypesLayer"],
          source: "armenianSoilTypesLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianSoilTypesLayer",
          source: "armenianSoilTypesLayerSource",
          openable: true,
          type: "fill",
          property: "Descriptio",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
        id: "armenianSoilTypesLayerSource",
        path: "/soil_types.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          blocks: [
            {
              type: "value",
              id: "Descriptio",
            },
            {
              type: "value",
              id: "Shape_Area",
            },
          ],
        },
        properties: [
          {
            id: "Descriptio",
            title: "Тип почвы",
            values: {
              "Alluvial-meadow saline lands and alkali soils": {
                color: "#9ddcda",
              },
              "Alluvial-meadow soils irrigated also in the past": {
                color: "#2fc9dd",
              },
              "Alpine mountaine-medow turf-peat soils": {
                color: "#85b70f",
              },
              "Brown mountainous-forest soils of dry firests and bushes": {
                color: "#b98746",
              },
              "Brown mountainous-forest soils of moderately humid forests": {
                color: "#d6a15c",
              },
              "Desalinated here and there fat mountainous black soils of humid steppe":
                {
                  color: "#75552c",
                },
              "Gray mountainous here and there gypsiferous & saline soils": {
                color: "#979797",
              },
              "Gypsiferous and here and there saline colored soils": {
                color: "#d1dbdd",
              },
              "Lake Sevan's outcropped bottomlands": {
                color: "#2863da",
              },
              "Meadow saline lands and alkali soils": {
                color: "#bedd74",
              },
              "Meadow-marshy soils": {
                color: "#0fbf6a",
              },
              "Mountain-fulvous soils of dry steppes": {
                color: "#dbb3bc",
              },
              "Mountainous carbonated and typical black soils with weakly developed black soils of moderately humid steppes":
                {
                  color: "#eecec1",
                },
              "Mountainous-forest steppe soils": {
                color: "#677288",
              },
              "Non-developed soils of snow-closed zone": {
                color: "#edec8d",
              },
              "Subalpian mountain-medow black soil-like": {
                color: "#565b0c",
              },
              "Subalpian mountain-medow brown soils": {
                color: "#8f5a21",
              },
              "Watered and irrigated also in the past cultivated gray mountainous soils":
                {
                  color: "#388ef0",
                },
              "": {
                color: "rgba(255,255,255,.2)",
              },
            },
          },
        ],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Климатические зоны",
      defaultZoom: 8,
      filters: [
        {
          property: "Descriptio",
          type: "string",
          filterVisualisationLayers: ["armenianClimateZonesLayer"],
          source: "armenianClimateZonesLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianClimateZonesLayer",
          source: "armenianClimateZonesLayerSource",
          openable: true,
          type: "fill",
          property: "Descriptio",
          paint: {
            "fill-opacity": 0.6,
          },
        },
      ],
    },
    [
      {
        id: "armenianClimateZonesLayerSource",
        path: "/climate_zones.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          blocks: [
            {
              type: "value",
              id: "Descriptio",
            },
            {
              type: "value",
              id: "Shape_Area",
            },
          ],
        },
        properties: [
          {
            id: "Descriptio",
            title: "Климатические зоны",
            values: {
              "Arid continental, with dry warm summersand moderate cold winters":
                {
                  color: "#d7191c",
                },
              "Arid subtropical, with hot summers and calm winters": {
                color: "#e75437",
              },
              "Arid, continental, with hot summers and cold winters": {
                color: "#f69053",
              },
              "Moderate, relatively dry warm summers and cold winters": {
                color: "#febe4e",
              },
              "Moderate, relativly humid during all seasons": {
                color: "#ffdf29",
              },
              "Moderate, with short cool summers and cold winters": {
                color: "#dcf02d",
              },
              "Moderate, with warm summers, relatively humid calm winters": {
                color: "#b8e156",
              },
              "Mountain tundra climate": {
                color: "#8acc62",
              },
              "Warm summers and relatively calm winters": {
                color: "#52b151",
              },
              "": {
                color: "rgba(255,255,255,.2)",
              },
            },
          },
        ],
        copyright: [],
      },
    ],
  ),

  createLayer(
    {
      title: "Лесные массивы",
      defaultZoom: 8,
      filters: [],
      visualisationLayers: [
        {
          id: "armenianForestAreasLayer",
          source: "armenianForestAreasLayerSource",
          openable: true,
          type: "fill",
          property: "",
          paint: {
            "fill-opacity": 0.6,
            "fill-color": "#0a6400",
          },
        },
      ],
    },
    [
      {
        id: "armenianForestAreasLayerSource",
        path: "/forested_areas.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          blocks: [],
        },
        properties: [],
        copyright: [],
      },
    ],
  ),
  createLayer(
    {
      title: "Зоны подземных вод",
      defaultZoom: 8,
      filters: [
        {
          property: "Descript",
          type: "string",
          filterVisualisationLayers: ["armenianGroundwaterZonesLayer"],
          source: "armenianGroundwaterZonesLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianGroundwaterZonesLayer",
          source: "armenianGroundwaterZonesLayerSource",
          openable: true,
          type: "line",
          property: "Descript",
          paint: {},
        },
      ],
    },
    [
      {
        id: "armenianGroundwaterZonesLayerSource",
        path: "/groundwater_zones.json",
        type: "geojson",
        projection: "EPSG:28408",
        card: {
          blocks: [
            {
              type: "value",
              id: "Descript",
            },
          ],
        },
        properties: [
          {
            id: "Descript",
            title: "Зоны подземных вод",
            values: {
              "Fault zones": {
                color: "#e31a1c",
              },
              "Unconfined groundwater of continental salinity": {
                color: "#ffab57",
              },
              "Deep faults zones with discharge of mineral water": {
                color: "#db1e2a",
              },
              "Tectonic faults zones with discharge of freshwater": {
                color: "#db1e2a",
              },
              "High capcity interlava and underlava water streams": {
                color: "#0e0e0e",
              },
              "Boundaries with aquifers with negative pressure": {
                color: "#1c8e1a",
              },
              "Boundaries with aquifers with positive pressure": {
                color: "#0524bc",
              },
            },
          },
        ],
        copyright: [],
      },
    ],
  ),

  createLayer(
    {
      title: "Минеральные и пресноводные источники",
      defaultZoom: 10,
      filters: [
        {
          property: "Flow_l_sec",
          type: "string",
          filterVisualisationLayers: [
            "armenianMineralAndFreshwaterResourcesLayer",
          ],
          source: "armenianMineralAndFreshwaterResourcesLayerSource",
        },
      ],
      visualisationLayers: [
        {
          id: "armenianMineralAndFreshwaterResourcesLayer",
          type: "circle",
          source: "armenianMineralAndFreshwaterResourcesLayerSource",
          openable: true,
          property: "Flow_l_sec",
          paint: {
            "circle-stroke-width": 1,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              MIN_ZOOM,
              5,
              MAX_ZOOM,
              10,
            ],
          },
        },
      ],
    },
    [
      {
        id: "armenianMineralAndFreshwaterResourcesLayerSource",
        path: "/mineral_and_freshwater_resources.json",
        type: "geojson",
        card: {
          blocks: [
            { type: "value", id: "Composit" },
            { type: "value", id: "Flow_l_sec" },
          ],
        },
        projection: "EPSG:28408",
        copyright: [],
        properties: [
          {
            id: "Composit",
            title: "Тип источника",
          },
          {
            id: "Flow_l_sec",
            title: "Скорость потока",
            values: {
              "<25": {
                color: "#d1e3f3",
              },
              "25-50": {
                color: "#9ac8e1",
              },
              "50-100": {
                color: "#529dcc",
              },
              "100-1000": {
                color: "#1c6cb1",
              },
              ">1000": {
                color: "#08306b",
              },
            },
          },
        ],
      },
    ],
  ),

  createLayer(
    {
      title: "Реки (5 км и более)",
      defaultZoom: 8,
      filters: [],
      visualisationLayers: [
        {
          id: "armenianRiversLayer",
          source: "armenianRiversLayerSource",
          openable: true,
          type: "line",
          property: "",
          paint: {
            "line-width": 2,
            "line-opacity": 0.6,
            "line-color": "#005987",
            // "line-color": "#3a3aa3",
          },
        },
      ],
    },
    [
      {
        id: "armenianRiversLayerSource",
        path: "/rivers.json",
        type: "geojson",
        projection: "EPSG:32638",
        card: {
          title: "Name",
          blocks: [{ type: "value", id: "Shape_Leng" }],
        },
        properties: [
          {
            id: "Shape_Leng",
            title: "Длина, м",
          },
        ],
        copyright: [],
      },
    ],
  ),
]);