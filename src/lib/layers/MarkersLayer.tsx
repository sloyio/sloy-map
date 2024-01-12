import { useMemo } from "react";
import { Layer, Marker, CircleLayer, Source } from "react-map-gl";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { getLayerStyle } from "@/helpers/getLayerStyle";
import { FilterLoader } from "@/filters/FilterLoader";
import { ActiveFilters, IVisualisationLayer } from "@/types";
import { sourcesSelector } from "@/state/selectors";
import { usePopup } from "../state/usePopup";
import styles from "./MarkersLayer.module.css";
import { getProperty } from "dot-prop";

interface Props {
  visualisationLayer: IVisualisationLayer;
  activeFilters: ActiveFilters;
}

export function MarkersLayer({
  visualisationLayer,
  activeFilters = [],
}: Props) {
  const { popupHash } = usePopup();
  const sources = useSelector(sourcesSelector);
  const source = sources[visualisationLayer?.source];

  const { loading, data } = useLoadGeoJSON(source);

  const markers = useMemo(() => {
    return data?.features.filter((feature) => {
      return activeFilters.find(
        ({ filter, values }) =>
          values?.includes(feature.properties?.[filter?.property]),
      )?.values;
    });
  }, [activeFilters, data?.features]);

  if (loading) {
    return <FilterLoader />;
  }

  if (!visualisationLayer?.type || !data || !source) {
    return null;
  }

  const fakeSourceId = `${visualisationLayer.source}-fake`;

  const fakeClickableMarkersLayerStyle: CircleLayer = {
    id: visualisationLayer.id,
    source: fakeSourceId,
    type: "circle",
    paint: {
      "circle-opacity": 0,
      "circle-radius": getLayerStyle<number>({
        initial: 22,
        hover: 22 * 1.2,
        active: 22 * 1.3,
      }),
    },
  };

  return (
    <>
      <Source
        id={fakeSourceId}
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: markers,
        }}
        generateId
      >
        <Layer {...fakeClickableMarkersLayerStyle} />
      </Source>

      {markers.map((feature) => {
        if (!feature.properties) {
          return null;
        }

        return (
          <Marker
            key={feature.properties.id}
            // @ts-ignore
            latitude={feature.geometry?.coordinates?.[1]}
            // @ts-ignore
            longitude={feature.geometry?.coordinates?.[0]}
          >
            <img
              className={classNames(styles.marker, {
                [styles.marker_open]: popupHash === feature.properties?.id,
              })}
              style={{
                color: getProperty(
                  source,
                  `properties.${visualisationLayer.property}.values.${[
                    feature.properties.type,
                  ]}.color`,
                ),
              }}
              width={40}
              height={40}
              src={
                (visualisationLayer.rootSrc || "") +
                getProperty(
                  feature.properties,
                  visualisationLayer.previewPath || "preview" || "img",
                )
              }
              alt={feature.properties.description}
            />
          </Marker>
        );
      })}
    </>
  );
}
