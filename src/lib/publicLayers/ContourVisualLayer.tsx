import maplibregl from "maplibre-gl";
import mlcontour from "maplibre-contour";
import { InputSloyLayer, InputSloySource } from "@/types";

const demSource = new mlcontour.DemSource({
  url: "https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png",
  encoding: "terrarium",
  maxzoom: 13,
  worker: true,
  cacheSize: 100,
  timeoutMs: 10_000,
});

demSource.setupMaplibre(maplibregl);

export const TERRAIN_VISUALISATION_LAYERS: InputSloyLayer["visualisationLayers"] =
  [
    {
      id: "hills",
      type: "map",
      source: "dem",
      mapLayerProps: {
        type: "hillshade",
        paint: {
          "hillshade-exaggeration": 0.25,
        },
      },
    },
  ];

export const CONTOUR_VISUALISATION_LAYERS: InputSloyLayer["visualisationLayers"] =
  [
    {
      id: "contours",
      type: "map",
      source: "contours",
      mapLayerProps: {
        type: "line",
        "source-layer": "contours",
        paint: {
          "line-color": "rgba(255, 255, 255, 50%)",
          "line-width": ["match", ["get", "level"], 1, 1, 0.2],
        },
        layout: {
          "line-join": "round",
        },
      },
    },
    {
      id: "contour-text",
      type: "map",
      source: "contours",
      mapLayerProps: {
        type: "symbol",
        "source-layer": "contours",
        filter: [">", ["get", "level"], 0],
        paint: {
          //   "text-halo-color": "rgba(255, 255, 255, 50%)",
          "text-color": "rgba(255, 255, 255, 50%)",
          //   "text-halo-width": 0.5,
        },
        layout: {
          "symbol-placement": "line",
          "text-anchor": "center",
          "text-size": 12,
          "text-field": ["concat", ["number-format", ["get", "ele"], {}], "'"],
          "text-font": ["Iset Sans Regular"],
        },
      },
    },
  ];

export const TERRAIN_SOURCE: InputSloySource = {
  id: "dem",
  type: "map-source",
  card: {
    blocks: [],
  },
  properties: [],
  copyright: [],
  mapSourceProps: {
    type: "raster-dem",
    encoding: "terrarium",
    tiles: [demSource.sharedDemProtocolUrl],
    maxzoom: 13,
    tileSize: 256,
  },
};

export const CONTOUR_SOURCE: InputSloySource = {
  id: "contours",
  type: "map-source",
  card: {
    blocks: [],
  },
  properties: [],
  copyright: [],
  mapSourceProps: {
    type: "vector",
    tiles: [
      demSource.contourProtocolUrl({
        multiplier: 3.28084,
        thresholds: {
          11: [200, 1000],
          12: [100, 500],
          13: [100, 500],
          14: [50, 200],
          15: [20, 100],
        },
        contourLayer: "contours",
        elevationKey: "ele",
        levelKey: "level",
        extent: 4096,
        buffer: 1,
      }),
    ],
    maxzoom: 15,
  },
};

export const terrainProps = {
  source: TERRAIN_SOURCE.id,
  exaggeration: 1,
};
