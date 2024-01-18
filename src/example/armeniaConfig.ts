import { MAX_ZOOM, MIN_ZOOM } from "./constants";
import { createAppState } from "@/helpers/createAppState";
import { createLayer } from "@/helpers/createLayer";
import { createSources } from "@/helpers/createSources";

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
]);
