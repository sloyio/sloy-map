import { useEffect, useState } from "react";
import GeoJSON, { FeatureCollection } from "geojson";
import proj4 from "proj4";
import { fetchAPI } from "@/helpers/fetchApi";
import { ISource } from "@/types";

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
              Point: [
                source?.latProperty || "lat",
                source.lngProperty || "lng",
              ],
            });
          }

          if (source.projection) {
            fetchedData.features = fetchedData.features.map((feature) => {
              if (feature.geometry.coordinates && source.projection) {
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
    source?.latProperty,
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
