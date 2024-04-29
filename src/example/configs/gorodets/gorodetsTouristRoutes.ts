import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsTouristRoutes: InputSloyLayer = {
  id: "gorodets-tourist-routes",
  title: "Туристические маршруты",
  filters: [
    {
      title: "Тип коммерции",
      type: "string[]",
      filterVisualizations: ["gorodetsTouristRoutesLinesLayer"],
      source: "gorodetsTouristRoutesSource",
      property: "name",
    },
  ],
  visualizations: [
    {
      id: "gorodetsTouristRoutesLinesLayer",
      source: "gorodetsTouristRoutesSource",
      type: "map",
      openable: true,
      property: "name",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 3,
          "line-opacity": 1,
        },
      },
    },
  ],
};

export const gorodetsTouristRoutesSource: InputSloySource = {
  id: "gorodetsTouristRoutesSource",
  path: "/gorodets-tourist_routes.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "name",
    blocks: [],
  },
  copyright: [],
  properties: [
    {
      id: "name",
      values: {
        "Маршрут Городец IX века": {
          title: "Маршрут Городец IX века",
          color: "#ae00ff",
        },
        "Маршрут Духовное наследие Александра Невского": {
          title: "Маршрут Духовное наследие Александра Невского",
          color: "#ffb700",
        },
        "Маршрут по музейному кварталу": {
          title: "Маршрут по Музейному кварталу",
          color: "#00ff11",
        },
        "Маршрут к Святому Источнику": {
          title: "Маршрут к Святому источнику",
          color: "#00ffff",
        },
        "Маршрут Такого вы не видели": {
          title: "Маршрут «Такого вы не видели»",
          color: "#ff0062",
        },
      },
    },
  ],
};
