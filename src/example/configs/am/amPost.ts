import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW, MAX_ZOOM, MIN_ZOOM } from "../../constants";

export const amPost: InputSloyLayer = {
  id: "am-post",
  title: "Почтовые отделения",
  description: "Список филиалов Армянской почты (Haypost.am).",
  updatedAt: "2023-09-11T07:46:00.000Z",
  license: "CC0-1.0 license",
  link: {
    href: "https://data.opendata.am/dataset/armenian-post-branches",
    label: "Источник",
  },
  initialViewState: COUNTRY_VIEW,
  filters: [],
  visualizations: [
    {
      id: "armenianPostBranchesLayer",
      type: "map",
      source: "armenianPostBranchesLayerSource",
      openable: true,
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

export const amPostSource: InputSloySource = {
  id: "armenianPostBranchesLayerSource",
  path: "/postalindex_ru.json",
  type: "json",
  card: {
    title: "address",
    blocks: [
      { type: "value", id: "postal_code" },
      { type: "value", id: "work_days" },
      { type: "value", id: "work_days_break_time" },
      { type: "value", id: "work_days_outside" },
      { type: "value", id: "saturday" },
      { type: "value", id: "saturday_break_time" },
      { type: "value", id: "saturday_outside" },
      { type: "value", id: "sunday" },
      { type: "value", id: "sunday_break_time" },
      { type: "value", id: "sunday_outside" },
    ],
  },
  copyright: ["DCA"],
  properties: [
    {
      id: "postal_code",
      title: "Почтовый индекс",
    },
    {
      id: "work_days",
      title: "Время работы в пн–пт",
    },
    {
      id: "work_days_break_time",
      title: "Перерыв в пн–пт",
    },
    {
      id: "work_days_outside",
      title: "Почтальон разносит письма в пн–пт",
    },
    {
      id: "saturday",
      title: "Время работы в сб",
    },
    {
      id: "saturday_break_time",
      title: "Перерыв в сб",
    },
    {
      id: "saturday_outside",
      title: "Почтальон разносит письма в сб",
    },
    {
      id: "sunday",
      title: "Время работы в вс",
    },
    {
      id: "sunday_break_time",
      title: "Перерыв в вс",
    },
    {
      id: "sunday_outside",
      title: "Почтальон разносит письма в вс",
    },
  ],
  latProperty: "lat",
  lngProperty: "long",
};
