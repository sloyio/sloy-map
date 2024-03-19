import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const ekbOkn: InputSloyLayer = {
  id: "ekb-okn",
  title: "Объекты культурного наследния",
  filters: [
    {
      title: "Объекты ОКН",
      type: "string",
      filterVisualizations: ["ekbOknObjectsLayer"],
      source: "ekbOknSource",
      property: "category",
      postfix: "шт.",
      totalHeader: "count",
      totalType: "percent",
    },
    {
      title: "Защитные зоны",
      color: "#e800b5",
      description:
        "Временная зона в\u00A0100\u2013250 метров вокруг объекта, у\u00A0которого пока не\u00A0указана зона охраны",

      type: "boolean",
      filterVisualizations: [
        "ekbOknProtectZoneLayer",
        "ekbOknProtectZoneLayerStroke",
      ],
      source: "ekbOknProtectZoneSource",
    },
    {
      title: "Зоны охраны ОКН",
      color: "#00b4ff",
      description:
        "Территории, в\u00A0пределах которых запрещены любые работы, так как они могут причинить вред объекту",

      type: "boolean",
      filterVisualizations: [
        "ekbOknSecurityZoneLayer",
        "ekbOknSecurityZoneLayerStroke",
      ],
      source: "ekbOknSecurityZoneSource",
    },
    {
      title: "Границы территорий ОКН",
      color: "#ff640f",
      description:
        "Объект культурного наследия и\u00A0неотделимая от\u00A0него территория",
      type: "boolean",
      filterVisualizations: [
        "ekbOknObjectZoneLayer",
        "ekbOknObjectZoneLayerStroke",
      ],
      source: "ekbOknObjectZoneSource",
    },
  ],
  visualizations: [
    {
      type: "marker-image",
      id: "ekbOknObjectsLayer",
      source: "ekbOknSource",
      property: "category",
      rootSrc: "https://ekbdev-map-refactor3.vercel.app/",
      previewPath: "preview.s.src",
      openable: true,
    },
    {
      id: "ekbOknProtectZoneLayer",
      source: "ekbOknProtectZoneSource",
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-color": "#e800b5",
          "fill-opacity": 0.2,
        },
      },
    },
    {
      id: "ekbOknSecurityZoneLayer",
      source: "ekbOknSecurityZoneSource",
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-color": "#00b4ff",
          "fill-opacity": 0.2,
        },
      },
    },
    {
      id: "ekbOknObjectZoneLayer",
      source: "ekbOknObjectZoneSource",
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-color": "#ff640f",
          "fill-opacity": 0.2,
        },
      },
    },
    {
      id: "ekbOknProtectZoneLayerStroke",
      source: "ekbOknProtectZoneSource",
      type: "map",
      mapLayerProps: {
        type: "line",
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
    },
    {
      id: "ekbOknSecurityZoneLayerStroke",
      source: "ekbOknSecurityZoneSource",
      type: "map",
      mapLayerProps: {
        type: "line",
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
    },
    {
      id: "ekbOknObjectZoneLayerStroke",
      source: "ekbOknObjectZoneSource",
      type: "map",
      mapLayerProps: {
        type: "line",
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
    },
  ],
};

export const ekbOknSources: InputSloySource[] = [
  {
    id: "ekbOknSource",
    type: "geojson",
    path: "https://ekbdev-map-refactor3.vercel.app/ekb-okn.json",
    copyright: ["okn"],
    card: {
      title: "name",
      additionalInfo: ["address"],
      cover: "img.url",
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
    path: "https://map.ekaterinburg.city/ekb-okn-protect.json",
    copyright: ["okn"],
  },
  {
    id: "ekbOknSecurityZoneSource",
    type: "geojson",
    card: { blocks: [] },
    properties: [],
    path: "https://map.ekaterinburg.city/ekb-okn-security.json",
    copyright: ["okn"],
  },
  {
    id: "ekbOknObjectZoneSource",
    type: "geojson",
    card: { blocks: [] },
    properties: [],
    path: "https://map.ekaterinburg.city/ekb-okn-objects.json",
    copyright: ["okn"],
  },
];
