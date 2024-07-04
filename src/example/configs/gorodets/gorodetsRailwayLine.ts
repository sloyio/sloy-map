import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsRailway: InputSloyLayer = {
  id: "gorodets-railway-line",
  title: "Железно-дорожные линии",
  filters: [
    {
      title: "Тип станций",
      type: "string[]",
      filterVisualizations: ["gorodetsRailwayPointsLayer"],
      source: "gorodetsRailwayPointsSource",
      property: "railway",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
    {
      title: "Тип линий",
      type: "string[]",
      filterVisualizations: ["gorodetsRailwayLinesLayer"],
      source: "gorodetsRailwayLinesSource",
      property: "railway",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "gorodetsRailwayPointsLayer",
      source: "gorodetsRailwayPointsSource",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "circle",
        paint: {
          "circle-color": "#fa1653",
          "circle-stroke-width": 1,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            0,
            MAX_ZOOM,
            10,
          ],
        },
      },
    },
    {
      id: "gorodetsRailwayLinesLayer",
      source: "gorodetsRailwayLinesSource",
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
          "line-color": "rgba(250, 22, 83, 0.5)",
        },
      },
    },
  ],
};

export const gorodetsRailwaySource: InputSloySource[] = [
  {
    id: "gorodetsRailwayPointsSource",
    path: "/gorodets-railway_point.geojson",
    type: "geojson",
    coordsProperty: "coords",
    projection: "EPSG:32638",
    card: {
      title: "name",
      blocks: [
        { type: "value", id: "operator" },
        { type: "value", id: "network" },
      ],
    },
    copyright: [],
    properties: [
      {
        id: "operator",
        title: "Оператор",
      },
      {
        id: "network",
        title: "Сеть",
      },
    ],
  },
  {
    id: "gorodetsRailwayLinesSource",
    path: "/gorodets-railway_line.geojson",
    type: "geojson",
    coordsProperty: "coords",
    projection: "EPSG:32638",
    card: { blocks: [] },
    copyright: [],
    properties: [],
  },
];
