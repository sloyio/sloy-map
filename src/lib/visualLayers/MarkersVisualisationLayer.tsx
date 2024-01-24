import { useMemo } from "react";
import { Layer, Marker, CircleLayer, Source } from "react-map-gl";
import { useAppSelector } from "@/state";
import { getLayerStyle } from "@/helpers/getLayerStyle";
import { ActiveFilters, IVisualisationLayer } from "@/types";
import { usePopup } from "../state/usePopup";
import { getProperty } from "dot-prop";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import styled, { css } from "styled-components";

interface Props {
  visualisationLayer: IVisualisationLayer;
  activeFilters: ActiveFilters;
  data: FeatureCollection<Geometry, GeoJsonProperties>;
}

const StyledMarker = styled.img<{ opened?: boolean; color?: string }>`
  font-size: 0;
  display: inline-block;
  object-fit: cover;
  box-shadow: 0 0 0 3px currentColor;
  border: 1px solid #000;
  border-radius: 100%;
  min-width: 100%;
  min-height: 100%;
  cursor: pointer;
  transition: all 0.15s;
  background-color: black;
  position: relative;
  transform-origin: center;
  width: 40px;
  height: 40px;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 0 4px currentColor;
    z-index: 9999 !important;
  }

  ${({ color }) => color}

  ${({ opened }) =>
    opened &&
    css`
      transform: scale(1.3);
      box-shadow: 0 0 0 4px currentColor;
      z-index: 9999 !important;
    `}
`;

export function MarkersVisualisationLayer({
  visualisationLayer,
  activeFilters = [],
  data,
}: Props) {
  const { popupHash } = usePopup();
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const source = sources[visualisationLayer?.source];

  const markers = useMemo(() => {
    return data?.features.filter((feature) => {
      return activeFilters.find(({ filter, values }) =>
        values?.includes(feature.properties?.[filter?.property]),
      )?.values;
    });
  }, [activeFilters, data?.features]);

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
        generateId
        id={fakeSourceId}
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: markers,
        }}
      />
      <Layer {...fakeClickableMarkersLayerStyle} />

      {markers.map((feature) => {
        if (!feature.properties) {
          return null;
        }

        const src = `${visualisationLayer.rootSrc || ""}${getProperty(
          feature.properties,
          visualisationLayer.previewPath || "preview" || "img",
        )}`;

        const color = getProperty(
          source,
          `properties.${visualisationLayer.property}.values.${[
            feature.properties.type,
          ]}.color`,
        );

        return (
          <Marker
            key={feature.properties?.id || feature.id}
            // @ts-ignore
            latitude={feature.geometry?.coordinates?.[1]}
            // @ts-ignore
            longitude={feature.geometry?.coordinates?.[0]}
          >
            <StyledMarker
              src={src}
              alt={feature.properties.description}
              opened={popupHash === feature.properties?.id}
              color={color}
            />
          </Marker>
        );
      })}
    </>
  );
}
