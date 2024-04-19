import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsBuildings: InputSloyLayer = {
  id: "gorodets-buildings",
  title: "Здания",
  filters: [],
  visualizations: [
    {
      id: "gorodetsBuildingsLineLayer",
      source: "gorodetsBuildingsLayerSource",
      openable: true,
      type: "map",
      property: "type",
      mapLayerProps: {
        type: "circle",
        paint: {
          "circle-color": "#fa4616",
          "circle-stroke-width": 1,
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
    },
  ],
};

export const gorodetsBuildingsSource: InputSloySource = {
  id: "gorodetsBuildingsLayerSource",
  path: "/gorodets-buildings.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:4326",
  card: {
    title: "display_name",
    blocks: [
      { type: "value", id: "Адрес_new" },
      { type: "value", id: "Общая площадь" },
      { type: "value", id: "Общая площадь жилых помещений" },
      { type: "value", id: "Количество этажей" },
      { type: "value", id: "Год ввода дома в эксплуатацию" },
      { type: "value", id: "Численность жителей" },
      { type: "value", id: "Количество подъездов" },
    ],
  },
  copyright: [],
  properties: [
    {
      id: "Адрес_new",
      title: "Адрес",
    },
    {
      id: "Общая площадь",
      title: "Общая площадь, м²",
    },
    {
      id: "Общая площадь жилых помещений",
      title: "Общая площадь жилых помещений, м²",
    },
    {
      id: "Количество этажей",
      title: "Количество этажей",
    },
    {
      id: "Год ввода дома в эксплуатацию",
      title: "Год ввода дома в эксплуатацию",
    },
    {
      id: "Численность жителей, чел.",
      title: "Численность жителей, чел.",
    },
    {
      id: "Количество подъездов, ед.",
      title: "Количество подъездов",
    },
  ],
};
