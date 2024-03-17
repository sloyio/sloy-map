import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amVegetation: InputSloyLayer = {
  id: "am-vegetation",
  title: "Типы растительности",
  initialViewState: COUNTRY_VIEW,
  description: "В данном слое показаны общие типы растительности в Армении.",
  updatedAt: "2017-05-31T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-399",
    label: "Источник",
  },
  filters: [
    {
      title: "Типы",
      property: "Veget_zone",
      type: "string",
      filterVisualizations: ["armenianVegetationTypesLayer"],
      source: "armenianVegetationTypesLayerSource",
      sortType: "count",
    },
  ],
  visualizations: [
    {
      id: "armenianVegetationTypesLayer",
      source: "armenianVegetationTypesLayerSource",
      openable: true,
      property: "Veget_zone",
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

export const amVegetationSource: InputSloySource = {
  id: "armenianVegetationTypesLayerSource",
  path: "/vegetation_types.json",
  type: "geojson",
  projection: "EPSG:28408",
  card: {
    blocks: [
      {
        type: "value",
        id: "Veget_zone",
      },
      {
        type: "value",
        id: "Area",
      },
    ],
  },
  properties: [
    {
      id: "Area",
      title: "Площадь, м²",
    },
    {
      id: "Veget_zone",
      title: "Зона",
      values: {
        "Alpine medows and dense turf formations": {
          title: "Alpine medows and dense turf formations",
          color: "#02e409",
        },
        "Beech, oak and hornbeam forests": {
          title: "Beech, oak and hornbeam forests",
          color: "#1fa000",
        },
        "Cereal and motley grass steppe with  tragacanth": {
          title: "Cereal and motley grass steppe with  tragacanth",
          color: "#ceea80",
        },
        "Coniferous and deciduous sparse trees": {
          title: "Coniferous and deciduous sparse trees",
          color: "#187403",
        },
        "Forests  of eastern oak": {
          title: "Forests  of eastern oak",
          color: "#2dc61e",
        },
        "Grassland steppe": {
          title: "Grassland steppe",
          color: "#b9e44b",
        },
        "Halophilous deserts (halophytic and others)": {
          title: "Halophilous deserts (halophytic and others)",
          color: "#ecf778",
        },
        "Lake Arpilich": {
          title: "Lake Arpilich",
          color: "#3196ff",
        },
        "Lake Sevan": {
          title: "Lake Sevan",
          color: "#3196ff",
        },
        "Lower alpine medows": {
          title: "Lower alpine medows",
          color: "#95eb6f",
        },
        "Mixed oak and hornbeam forests": {
          title: "Mixed oak and hornbeam forests",
          color: "#5bae75",
        },
        "Psammophilous deserts": {
          title: "Psammophilous deserts",
          color: "#e3d612",
        },
        "Vegetation of exposed soils": {
          title: "Vegetation of exposed soils",
          color: "#95aba8",
        },
        "Water-marsh vegetation": {
          title: "Water-marsh vegetation",
          color: "#87d4b4",
        },
        "Wormwood semi-deserts (sweet wormwood)": {
          title: "Wormwood semi-deserts (sweet wormwood)",
          color: "#e9da81",
        },
        "Xerophilous bushes and grasses": {
          title: "Xerophilous bushes and grasses",
          color: "#c9d05f",
        },
      },
    },
  ],
  copyright: ["DCA"],
};
