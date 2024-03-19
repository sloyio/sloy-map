import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amLanduse: InputSloyLayer = {
  id: "am-landuse",
  title: "Землепользование",
  initialViewState: COUNTRY_VIEW,
  description:
    "Этот слой показывает землепользование в Армении. Эта карта была подготовлена в рамках финансируемой ЕС «Программы предупреждения, готовности и реагирования на природные и техногенные катастрофы в Восточном регионе ЕПД (PPRDEast)».",
  updatedAt: "2017-02-14T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-81",
    label: "Источник",
  },
  filters: [
    {
      title: "Типы",
      property: "Landuse",
      type: "string",
      filterVisualizations: ["armenianLandUseLayer"],
      source: "armenianLandUseLayerSource",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "armenianLandUseLayer",
      source: "armenianLandUseLayerSource",
      openable: true,
      property: "Landuse",
      type: "map",
      mapLayerProps: {
        type: "fill",
        paint: {
          "fill-opacity": 0.6,
        },
      },
    },
  ],
};

export const amLandUseSource: InputSloySource = {
  id: "armenianLandUseLayerSource",
  path: "/land_use.json",
  type: "geojson",
  projection: "EPSG:32638",
  card: {
    blocks: [
      {
        type: "value",
        id: "Landuse",
      },
      {
        type: "value",
        id: "Shape_Area",
      },
    ],
  },
  properties: [
    {
      id: "Landuse",
      title: "Тип землепользования",
      values: {
        "Arable land": {
          title: "Arable land",
          color: "#fdad51",
        },
        Crops: {
          title: "Crops",
          color: "#a06525",
        },
        "Forest, shrubland": {
          title: "Forest, shrubland",
          color: "#217c16",
        },
        Grassland: {
          title: "Grassland",
          color: "#5dba26",
        },
        "Lakes, reservoirs": {
          title: "Lakes, reservoirs",
          color: "#a5bfdd",
        },
        Pastures: {
          title: "Pastures",
          color: "#81fb44",
        },
        "Yerevan city": {
          title: "Yerevan city",
          color: "#eb3a09",
        },
      },
    },
    {
      id: "Shape_Area",
      title: "Площадь, м²",
    },
  ],
  copyright: ["DCA"],
};
