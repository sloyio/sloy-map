import { InputSloySource } from "@/types";

// not used
export const amSolarRadiationSource: InputSloySource = {
  id: "armenianSolarRadiationLevelLayerSource",
  path: "/solar_radiation_level.json",
  type: "geojson",
  projection: "EPSG:28408",
  card: {
    blocks: [
      {
        type: "value",
        id: "Sun_radiat",
      },
    ],
  },
  properties: [
    {
      id: "Sun_radiat",
      title: "ккал/см²",
      values: {
        115: {
          color: "#ffffb2",
        },
        120: {
          color: "#ffeb90",
        },
        125: {
          color: "#ffd76d",
        },
        130: {
          color: "#fec055",
        },
        135: {
          color: "#fea649",
        },
        140: {
          color: "#fd8d3c",
        },
        145: {
          color: "#f86c30",
        },
        150: {
          color: "#f34b25",
        },
        155: {
          color: "#e62f21",
        },
        160: {
          color: "#d21723",
        },
        165: {
          color: "#bd0026",
        },
      },
    },
  ],
  copyright: ["DCA"],
};
