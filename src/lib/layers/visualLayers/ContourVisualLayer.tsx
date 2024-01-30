import maplibregl from "maplibre-gl";
import mlcontour from "maplibre-contour";
import { Layer, Source } from "react-map-gl";
import { ReactNode } from "react";

const demSource = new mlcontour.DemSource({
  url: "https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png",
  encoding: "terrarium",
  maxzoom: 13,
  worker: true, // offload isoline computation to a web worker to reduce jank
  cacheSize: 100, // number of most-recent tiles to cache
  timeoutMs: 10_000, // timeout on fetch requests
});

// calls maplibregl.addProtocol for the shared cache and contour protocols
demSource.setupMaplibre(maplibregl);

const sources = [
  {
    id: "dem",
    type: "raster-dem",
    encoding: "terrarium",
    tiles: [demSource.sharedDemProtocolUrl], // share cached DEM tiles with contour layer
    maxzoom: 13,
    tileSize: 256,
  },
  //   {
  //     id: "contours",
  //     type: "vector",
  //     tiles: [
  //       demSource.contourProtocolUrl({
  //         // meters to feet
  //         multiplier: 3.28084,
  //         thresholds: {
  //           // zoom: [minor, major]
  //           11: [200, 1000],
  //           12: [100, 500],
  //           13: [100, 500],
  //           14: [50, 200],
  //           15: [20, 100],
  //         },
  //         // optional, override vector tile parameters:
  //         contourLayer: "contours",
  //         elevationKey: "ele",
  //         levelKey: "level",
  //         extent: 4096,
  //         buffer: 1,
  //       }),
  //     ],
  //     maxzoom: 15,
  //   },
];

const layers = [
  {
    id: "hills",
    type: "hillshade",
    source: "dem",
    paint: {
      "hillshade-exaggeration": 0.25,
    },
  },
  //   {
  //     id: "contours",
  //     type: "line",
  //     source: "contours",
  //     "source-layer": "contours",
  //     paint: {
  //       "line-color": "rgba(255, 255, 255, 50%)",
  //       "line-width": ["match", ["get", "level"], 1, 1, 0.2],
  //     },
  //     layout: {
  //       "line-join": "round",
  //     },
  //   },
  //   {
  //     id: "contour-text",
  //     type: "symbol",
  //     source: "contours",
  //     "source-layer": "contours",
  //     filter: [">", ["get", "level"], 0],
  //     paint: {
  //       //   "text-halo-color": "rgba(255, 255, 255, 50%)",
  //       "text-color": "rgba(255, 255, 255, 50%)",
  //       //   "text-halo-width": 0.5,
  //     },
  //     layout: {
  //       "symbol-placement": "line",
  //       "text-anchor": "center",
  //       "text-size": 12,
  //       "text-field": ["concat", ["number-format", ["get", "ele"], {}], "'"],
  //       "text-font": ["Iset Sans Regular"],
  //     },
  //   },
];

// function TerrainControl() {
//   useControl(
//     () =>
//       new maplibregl.TerrainControl({
//         source: "dem",
//         exaggeration: 1,
//       }),
//   );

//   return null;
// }

export const terrainProps = {
  source: "dem",
  exaggeration: 1,
};

export function TerranMap({ children }: { children?: ReactNode }) {
  return (
    <>
      {sources.map((s) => (
        <Source key={s.id} {...s} />
      ))}
      {children}
      {layers.map((l) => (
        <Layer key={l.id} {...l} />
      ))}
      {/* <TerrainControl /> */}
    </>
  );
}
