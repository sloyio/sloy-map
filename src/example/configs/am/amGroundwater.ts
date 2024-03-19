import { InputSloyLayer, InputSloySource } from "@/types";
import { COUNTRY_VIEW } from "../../constants";

export const amGroundwater: InputSloyLayer = {
  id: "am-groundwater",
  title: "Зоны подземных вод",
  initialViewState: COUNTRY_VIEW,
  description:
    "Этот слой показывает зоны подземных вод в Армении. Он был оцифрован с гидрогеологической карты, первоначально загруженной из Агентства по управлению водными ресурсами Министерства охраны природы Республики Армения.",
  updatedAt: "2020-07-08T19:00:00.000Z",
  license: "No license provided",
  link: {
    href: "https://data.opendata.am/dataset/sustc-1069",
    label: "Источник",
  },
  filters: [
    {
      title: "Зоны",
      property: "Descript",
      type: "string",
      filterVisualizations: ["armenianGroundwaterZonesLayer"],
      source: "armenianGroundwaterZonesLayerSource",
      postfix: "шт.",
      sortType: "count",
      totalHeader: "count",
      totalType: "percent",
    },
  ],
  visualizations: [
    {
      id: "armenianGroundwaterZonesLayer",
      source: "armenianGroundwaterZonesLayerSource",
      openable: true,
      property: "Descript",
      type: "map",
      mapLayerProps: {
        type: "line",
        paint: {
          "line-width": 2,
        },
      },
    },
  ],
};

export const amGroundwaterSource: InputSloySource = {
  id: "armenianGroundwaterZonesLayerSource",
  path: "/groundwater_zones.json",
  type: "geojson",
  projection: "EPSG:28408",
  card: {
    title: "Descript",
    blocks: [],
  },
  properties: [
    {
      id: "Descript",
      title: "Зоны подземных вод",
      values: {
        "Fault zones": {
          title: "Fault zones",
          color: "#e31a1c",
        },
        "Unconfined groundwater of continental salinity": {
          title: "Unconfined groundwater of continental salinity",
          color: "#ffab57",
        },
        "Deep faults zones with discharge of mineral water": {
          title: "Deep faults zones with discharge of mineral water",
          color: "#db1e2a",
        },
        "Tectonic faults zones with discharge of freshwater": {
          title: "Tectonic faults zones with discharge of freshwater",
          color: "#db1e2a",
        },
        "High capcity interlava and underlava water streams": {
          title: "High capcity interlava and underlava water streams",
          color: "#5e5e5e",
        },
        "Boundaries with aquifers with negative pressure": {
          title: "Boundaries with aquifers with negative pressure",
          color: "#1c8e1a",
        },
        "Boundaries with aquifers with positive pressure": {
          title: "Boundaries with aquifers with positive pressure",
          color: "#0524bc",
        },
      },
    },
  ],
  copyright: ["DCA"],
};
