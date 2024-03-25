import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW, MAX_ZOOM, MIN_ZOOM } from "../../constants";

export const amMedical: InputSloyLayer = {
  id: "am-medical",
  title: "Медицинские учреждения",
  description:
    "В этом слое представлен список действующих медицинских учреждений.",
  initialViewState: COUNTRY_VIEW,
  updatedAt: "2024-02-07T19:00:00.000Z",
  license: "ODbL",
  link: {
    href: "https://data.humdata.org/dataset/armenia-healthsites",
    label: "Источник",
  },
  filters: [
    {
      title: "Типы",
      property: "amenity",
      type: "string",
      filterVisualizations: [
        "HealthsitesLineLayer",
        "HealthsitesFillLayer",
        "HealthsitesHeatmapLayer",
      ],
      source: "HealthsitesLayerSource",
      sortType: "count",
      postfix: "шт.",
      totalHeader: "count",
      totalType: "percent",
    },
  ],
  visualizations: [
    {
      id: "HealthsitesLineLayer",
      source: "HealthsitesLayerSource",
      openable: true,
      type: "map",
      property: "amenity",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
          "line-opacity": 1,
        },
      },
    },
    {
      id: "HealthsitesFillLayer",
      source: "HealthsitesLayerSource",
      openable: true,
      type: "map",
      property: "amenity",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.5,
        },
      },
    },
    {
      id: "HealthsitesHeatmapLayer",
      source: "HealthsitesLayerSource",
      type: "map",
      property: "amenity",
      mapLayerProps: {
        type: "heatmap",
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
            "rgba(0, 4, 255, 0)",
            0.2,
            "rgba(0, 60, 255, 0.1)",
            0.4,
            "rgba(0, 110, 255, 0.3)",
            0.6,
            "rgba(0, 166, 255, 0.5)",
            1,
            "rgb(0, 242, 255)",
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            MIN_ZOOM,
            15,
            MAX_ZOOM,
            10,
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
    },
  ],
};

export const amMedicalSource: InputSloySource = {
  id: "HealthsitesLayerSource",
  path: "/healthsites.geojson",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    title: "name",
    blocks: [
      { type: "tag", id: "amenity" },
      { type: "value", id: "operator" },
      { type: "value", id: "addr_street" },
      { type: "value", id: "addr_housenumber" },
      { type: "value", id: "addr_postcode" },
      { type: "value", id: "opening_hours" },
    ],
  },
  properties: [
    {
      id: "amenity",
      title: "Тип",
      values: {
        pharmacy: {
          title: "pharmacy",
          color: "#08d226",
        },
        hospital: {
          title: "hospital",
          color: "#0d72ff",
        },
        dentist: {
          title: "dentist",
          color: "#00ffff",
        },
        clinic: {
          title: "clinic",
          color: "#a73ff0",
        },
        doctors: {
          title: "doctors",
          color: "#e0e404",
        },
      },
    },
    {
      id: "operator",
      title: "Оператор мед. учреждения",
    },
    {
      id: "addr_street",
      title: "Улица",
    },
    {
      id: "addr_housenumber",
      title: "Номер дома",
    },
    {
      id: "addr_postcode",
      title: "Почтовый индекс",
    },
    {
      id: "opening_hours",
      title: "Время работы",
    },
  ],
  copyright: ["HDX"],
};
