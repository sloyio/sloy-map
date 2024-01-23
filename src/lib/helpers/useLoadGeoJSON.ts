import { useEffect, useState } from "react";
import GeoJSON, {
  FeatureCollection,
  MultiLineString,
  MultiPolygon,
} from "geojson";
import proj4 from "proj4";
import { fetchAPI } from "@/helpers/fetchApi";
import { ISource } from "@/types";

// https://epsg.io/32638.js

proj4.defs(
  "EPSG:28408",
  "+proj=tmerc +lat_0=0 +lon_0=45 +k=1 +x_0=8500000 +y_0=0 +ellps=krass +towgs84=23.92,-141.27,-80.9,0,-0.35,-0.82,-0.12 +units=m +no_defs +type=crs",
);

proj4.defs(
  "EPSG:32638",
  "+proj=utm +zone=38 +datum=WGS84 +units=m +no_defs +type=crs",
);

export function useLoadGeoJSON(source: ISource): {
  loading: boolean;
  data: FeatureCollection;
} {
  const path = source?.path;
  const [data, setData] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (path) {
      setLoading(true);
      fetchAPI(path).then((data) => {
        setLoading(false);

        let fetchedData: FeatureCollection<any> = data;

        try {
          if (source.type === "json") {
            // @ts-expect-error
            fetchedData = GeoJSON.parse(data, {
              Point: source.coordsProperty || [
                source.latProperty || "lat",
                source.lngProperty || "lng",
              ],
            });
          }

          if (source.projection) {
            fetchedData.features = fetchedData.features.map((feature) => {
              if (feature.geometry.coordinates && source.projection) {
                if (feature.geometry.type === "Point") {
                  return {
                    ...feature,
                    geometry: {
                      ...feature.geometry,
                      coordinates: proj4(
                        source.projection,
                        "EPSG:4326",
                        feature.geometry.coordinates,
                      ),
                    },
                  };
                }

                if (feature.geometry.type === "MultiLineString") {
                  return {
                    ...feature,
                    geometry: {
                      ...feature.geometry,
                      coordinates: (
                        feature.geometry as MultiLineString
                      ).coordinates.map((polygon: any) =>
                        polygon.map((coord: any) =>
                          proj4(
                            source.projection as string,
                            "EPSG:4326",
                            coord,
                          ),
                        ),
                      ),
                    },
                  };
                }

                if (feature.geometry.type === "MultiPolygon") {
                  return {
                    ...feature,
                    geometry: {
                      ...feature.geometry,
                      coordinates: (
                        feature.geometry as MultiPolygon
                      ).coordinates.map((polygon) =>
                        polygon.map((ring) =>
                          ring.map((coord) => {
                            return proj4(
                              source.projection as string,
                              "EPSG:4326",
                              coord,
                            );
                          }),
                        ),
                      ),
                    },
                  };
                }
              }

              return feature;
            });
          }

          if (source.isCoordsReverse) {
            fetchedData.features = fetchedData.features.map((feature) => {
              if (
                feature.geometry.coordinates &&
                feature.geometry.type === "Point"
              ) {
                return {
                  ...feature,
                  geometry: {
                    ...feature.geometry,
                    coordinates: [
                      feature.geometry.coordinates[1],
                      feature.geometry.coordinates[0],
                    ],
                  },
                };
              }
              return feature;
            });
          }

          fetchedData.features = fetchedData.features.map((feature, i) => {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                id: feature.properties?.id || feature.id || i,
              },
            };
          });
        } catch (e) {
          console.log("Error with parsing", source.path, e);
        }

        setData(fetchedData);
      });
    }
  }, [
    path,
    source.coordsProperty,
    source.isCoordsReverse,
    source.latProperty,
    source.lngProperty,
    source.path,
    source.projection,
    source.type,
  ]);

  if (!path) {
    return {
      loading: false,
      data: {
        type: "FeatureCollection",
        features: [],
      },
    };
  }

  return {
    loading,
    data,
  };
}

// TODO
// color scheme
// import { schemeCategory10 } from "d3-scale-chromatic";
// schemeCategory10[parseInt((Math.random() * 1000) % 10, 10)]

// import { useMemo } from "react";
// import GeoJSON, {
//   FeatureCollection,
//   MultiLineString,
//   MultiPolygon,
//   Point,
// } from "geojson";
// import proj4 from "proj4";
// import useSWRImmutable from "swr/immutable";
// import { ISource } from "@/types";

// // https://epsg.io/32638.js

// proj4.defs(
//   "EPSG:28408",
//   "+proj=tmerc +lat_0=0 +lon_0=45 +k=1 +x_0=8500000 +y_0=0 +ellps=krass +towgs84=23.92,-141.27,-80.9,0,-0.35,-0.82,-0.12 +units=m +no_defs +type=crs",
// );

// proj4.defs(
//   "EPSG:32638",
//   "+proj=utm +zone=38 +datum=WGS84 +units=m +no_defs +type=crs",
// );

// export default async function fetcher<JSON = any>(
//   input: RequestInfo,
//   init?: RequestInit,
// ): Promise<JSON> {
//   const res = await fetch(input, init);
//   return res.json();
// }

// export function useLoadGeoJSON(source: ISource): {
//   loading: boolean;
//   data: FeatureCollection;
// } {
//   const path = source?.path;
//   const { data, isLoading } = useSWRImmutable<FeatureCollection>(path, fetcher);

//   const formattedData = useMemo(() => {
//     let fetchedData = data || {
//       type: "FeatureCollection",
//       features: [],
//     };

//     if (!data || !path) {
//       return fetchedData;
//     }

//     try {
//       if (source.type === "json") {
//         // @ts-expect-error
//         fetchedData = GeoJSON.parse(data, {
//           Point: source.coordsProperty || [
//             source.latProperty || "lat",
//             source.lngProperty || "lng",
//           ],
//         });
//       }

//       if (source.projection) {
//         fetchedData.features = fetchedData.features.map((feature) => {
//           if ((feature.geometry as any)?.coordinates && source.projection) {
//             if (feature.geometry.type === "Point") {
//               return {
//                 ...feature,
//                 geometry: {
//                   ...feature.geometry,
//                   coordinates: proj4(
//                     source.projection,
//                     "EPSG:4326",
//                     feature.geometry.coordinates,
//                   ),
//                 },
//               };
//             }

//             if (feature.geometry.type === "MultiLineString") {
//               return {
//                 ...feature,
//                 geometry: {
//                   ...feature.geometry,
//                   coordinates: (
//                     feature.geometry as MultiLineString
//                   ).coordinates.map((polygon: any) =>
//                     polygon.map((coord: any) =>
//                       proj4(source.projection as string, "EPSG:4326", coord),
//                     ),
//                   ),
//                 },
//               };
//             }

//             if (feature.geometry.type === "MultiPolygon") {
//               return {
//                 ...feature,
//                 geometry: {
//                   ...feature.geometry,
//                   coordinates: (
//                     feature.geometry as MultiPolygon
//                   ).coordinates.map((polygon) =>
//                     polygon.map((ring) =>
//                       ring.map((coord) => {
//                         return proj4(
//                           source.projection as string,
//                           "EPSG:4326",
//                           coord,
//                         );
//                       }),
//                     ),
//                   ),
//                 },
//               };
//             }
//           }

//           return feature;
//         });
//       }

//       if (source.isCoordsReverse) {
//         fetchedData.features = fetchedData.features.map((feature) => {
//           if (
//             (feature.geometry as Point).coordinates &&
//             feature.geometry.type === "Point"
//           ) {
//             return {
//               ...feature,
//               geometry: {
//                 ...feature.geometry,
//                 coordinates: [
//                   feature.geometry.coordinates[1],
//                   feature.geometry.coordinates[0],
//                 ],
//               },
//             };
//           }
//           return feature;
//         });
//       }

//       fetchedData.features = fetchedData.features.map((feature, i) => {
//         return {
//           ...feature,
//           properties: {
//             ...feature.properties,
//             id: feature.properties?.id || feature.id || i,
//           },
//         };
//       });
//     } catch (e) {
//       console.log("Error with parsing", source.path, e);
//     }

//     return fetchedData;
//   }, [
//     data,
//     path,
//     source.coordsProperty,
//     source.isCoordsReverse,
//     source.latProperty,
//     source.lngProperty,
//     source.path,
//     source.projection,
//     source.type,
//   ]);

//   return {
//     loading: isLoading,
//     data: formattedData,
//   };
// }

// // TODO
// // color scheme
// // import { schemeCategory10 } from "d3-scale-chromatic";
// // schemeCategory10[parseInt((Math.random() * 1000) % 10, 10)]
