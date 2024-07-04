import { useMemo } from "react";
import { Layer, Marker, CircleLayer, Source } from "react-map-gl";
import { useAppSelector } from "@/state";
import { getLayerStateStyle } from "@/helpers/getLayerStyle";
import { ActiveFilters, IMarkerImageVisualization } from "@/types";
import { getProperty } from "dot-prop";
import styled, { css } from "styled-components";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { ClickableVisualization } from "./helpers/ClickableVisualization";
import { useCard } from "@/state/useCard";

const OKN_MARKER_CLICKABLE_SIZE = 15;
const OKN_MARKER_IMAGE_SIZE = (OKN_MARKER_CLICKABLE_SIZE + 2) * 2;

interface Props {
  visualization: IMarkerImageVisualization;
  activeFilters: ActiveFilters;
}

const StyledMarker = styled.img<{ $opened?: boolean; color?: string }>`
  object-fit: cover;
  border: 3px solid currentColor;
  background: currentColor;
  outline: 1px solid #000;
  outline-offset: -4px;
  border-radius: 100%;
  min-width: 100%;
  min-height: 100%;
  cursor: pointer;
  transition: all 0.1s;
  position: relative;
  transform-origin: center;
  display: flex;

  &:hover {
    z-index: 9999 !important;
    transform: scale(1.4);
  }

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  ${({ $opened }) =>
    $opened &&
    css`
      &,
      &:hover {
        transform: scale(1.7);
        z-index: 9999 !important;
      }
    `}
`;

export default function MarkersVisualization({
  visualization,
  activeFilters = [],
}: Props) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const source = sources[visualization?.source];
  const { loading, data } = useLoadGeoJSON(source);
  const { cardId } = useCard();

  const markers = useMemo(() => {
    return data?.features.filter((feature) => {
      return activeFilters.find(
        ({ filter, values }) =>
          filter?.property &&
          values?.includes(feature.properties?.[filter?.property]),
      )?.values;
    });
  }, [activeFilters, data?.features]);

  if (!visualization?.type || !data || !source) {
    return null;
  }

  const fakeSourceId = `${visualization.source}-fake`;

  const fakeClickableMarkersLayerStyle: CircleLayer = {
    id: visualization.id,
    source: fakeSourceId,
    type: "circle",
    paint: {
      "circle-opacity": 0,
      "circle-radius": getLayerStateStyle<number>({
        initial: OKN_MARKER_CLICKABLE_SIZE,
        hover: OKN_MARKER_CLICKABLE_SIZE * 1.4,
        active: OKN_MARKER_CLICKABLE_SIZE * 1.7,
      }),
    },
  };

  if (loading) return null;

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
      {visualization.openable && (
        <ClickableVisualization visualization={visualization} />
      )}
      <Layer {...fakeClickableMarkersLayerStyle} generateId />

      {markers.map((feature) => {
        if (!feature.properties) {
          return null;
        }

        const src = `${visualization.rootSrc || ""}${getProperty(
          feature.properties,
          visualization.previewPath || "preview" || "img",
        )}`;

        const color = visualization?.property
          ? getProperty(
              source,
              `properties.${visualization.property}.values.${[
                feature.properties?.[visualization?.property],
              ]}.color`,
            )
          : undefined;

        // @ts-ignore
        const x = feature.geometry?.coordinates?.[1];
        // @ts-ignore
        const y = feature.geometry?.coordinates?.[0];

        if (isNaN(x) || isNaN(y)) {
          return null;
        }

        return (
          <Marker
            key={feature.properties?.id || feature.id}
            latitude={x}
            longitude={y}
          >
            <StyledMarker
              src={src}
              alt={feature.properties.description}
              $opened={cardId === feature.properties?.id}
              color={color}
              width={OKN_MARKER_IMAGE_SIZE}
              height={OKN_MARKER_IMAGE_SIZE}
            />
          </Marker>
        );
      })}
    </>
  );
}
