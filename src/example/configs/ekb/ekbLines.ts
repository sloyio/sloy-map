import { InputSloyLayer, InputSloySource } from "@/types";
import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const ekbLines: InputSloyLayer = {
  id: "ekb-lines",
  title: "Туристические маршруты",
  filters: [
    {
      type: "string",
      filterVisualizations: ["ekbPointsLayer", "ekbLinesLayer"],
      source: "ekbPointsSource",
      property: "type",
    },
  ],
  visualizations: [
    {
      id: "ekbLinesLayer",
      source: "ekbLinesSource",
      property: "type",
      type: "map",
      mapLayerProps: {
        type: "line",
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
    },
    {
      id: "ekbPointsLayer",
      source: "ekbPointsSource",
      property: "type",
      openable: true,
      type: "map",
      mapLayerProps: {
        type: "circle",
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
    },
  ],
};

export const ekbLineSource: InputSloySource[] = [
  {
    id: "ekbLinesSource",
    path: "https://map.ekaterinburg.city/ekb-color-lines.json",
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
    path: "https://map.ekaterinburg.city/ekb-color-points.json",
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
];
