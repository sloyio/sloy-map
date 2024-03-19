import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amSeismic: InputSloyLayer = {
  id: "am-seismic",
  title: "Сейсмическое зонирование",
  description:
    "Этот слой показывает сейсмические зоны в Армении. Карта сейсмического районирования территории Республики Армения подготовлена консорциумом AIR Worldwide Corporation (США), GEM Foundation (Италия) и АОЗТ «ГЕОРИСК» (Армения) в рамках проекта № 7179350 «Вероятностная оценка сейсмической опасности для Республики Армения» при поддержке Всемирного банка. Территория РА разделена на три зоны в порядке возрастания интенсивности (I, II и III) с ожидаемыми значениями PGA, выраженными в долях g (силы тяжести) 0.3g, 0.4g и 0.5g, соответственно.",
  updatedAt: "2019-05-05T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-991",
    label: "Источник",
  },
  initialViewState: COUNTRY_VIEW,
  filters: [
    {
      title: "Зоны",
      property: "Zone",
      type: "string",
      filterVisualizations: ["armenianSeismicZonesLayer"],
      source: "armenianSeismicZonesLayerSource",
    },
  ],
  visualizations: [
    {
      id: "armenianSeismicZonesLayer",
      source: "armenianSeismicZonesLayerSource",
      openable: true,
      type: "map",
      property: "Zone",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.6,
        },
      },
    },
  ],
};

export const amSeismicSource: InputSloySource = {
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
      {
        type: "value",
        id: "Zone_g",
      },
    ],
  },
  properties: [
    {
      id: "Zone",
      title: "Сейсмическая зона",
      values: {
        I: {
          color: "#ffdd33",
          description: "0.3 g",
        },
        II: {
          color: "#ff9933",
          description: "0.4 g",
        },
        III: {
          color: "#ff3311",
          description: "0.5 g",
        },
      },
    },
    {
      id: "Area_km2",
      title: "Площадь, км²",
    },
    {
      id: "Zone_g",
      title: "Гравитация, g",
    },
  ],
  copyright: ["DCA"],
};
