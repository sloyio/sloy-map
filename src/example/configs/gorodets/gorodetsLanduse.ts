import { InputSloyLayer, InputSloySource } from "@/types";
// import { MAX_ZOOM, MIN_ZOOM } from "src/example/constants";

export const gorodetsLanduse: InputSloyLayer = {
  id: "gorodets-landuse",
  title: "Землепользование",
  filters: [
    {
      title: "Тип землепользования",
      type: "string[]",
      filterVisualizations: [
        "gorodetsLanduseLineLayer",
        "gorodetsLanduseFillLayer",
      ],
      source: "gorodetsLanduseLayerSource",
      property: "landuse",
      totalType: "percent",
      postfix: "шт.",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "gorodetsLanduseLineLayer",
      source: "gorodetsLanduseLayerSource",
      openable: true,
      type: "map",
      property: "landuse",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 1,
          "line-opacity": 1,
        },
      },
    },
    {
      id: "gorodetsLanduseFillLayer",
      source: "gorodetsLanduseLayerSource",
      openable: true,
      type: "map",
      property: "landuse",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.7,
        },
      },
    },
  ],
};

export const gorodetsLanduseSource: InputSloySource = {
  id: "gorodetsLanduseLayerSource",
  path: "/gorodets-landuse.geojson",
  type: "geojson",
  coordsProperty: "coords",
  projection: "EPSG:32638",
  card: {
    title: "name",
    blocks: [{ type: "tag", id: "landuse" }],
  },
  copyright: [],
  properties: [
    {
      id: "landuse",
      title: "Тип землепользования",
      values: {
        residential: {
          title: "Жилая застройка",
          color: "#5b0085",
        },
        farmland: {
          title: "Сельскохозяйственные угодья",
          color: "#00971e",
        },
        industrial: {
          title: "Промзоны",
          color: "#5691ff",
        },
        grass: {
          title: "Трава",
          color: "#66ff00",
        },
        allotments: {
          title: "Выделеные участки",
          color: "#003ebb",
        },
        garages: {
          title: "Гаражи",
          color: "#006263",
        },
        construction: {
          title: "Стройка",
          color: "#939ba1",
        },
        cemetery: {
          title: "Кладбища",
          color: "#00976f",
        },
        forest: {
          title: "Леса",
          color: "#49ff31",
        },
        landfill: {
          title: "Мусорные полигоны",
          color: "#614900",
        },
        commercial: {
          title: "Коммерческие участки",
          color: "#ff00c8",
        },
        military: {
          title: "Воинские части",
          color: "#00ffe1",
        },
      },
    },
  ],
};
