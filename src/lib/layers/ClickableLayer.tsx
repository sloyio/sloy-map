import { Layer } from "react-map-gl";
import { useAppSelector } from "@/state";
import { ActiveFilters, IVisualisationLayer } from "@/types";
import { getLayerProps } from "@/helpers/getLayerProps";
import useMapObjectState from "@/helpers/useMapObjectState";
import { useOpenMapItem } from "@/helpers/useOpenMapItem";
import { MarkersLayer } from "./MarkersLayer";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

function ClickableLayer({
  visualisationLayer,
}: {
  visualisationLayer: IVisualisationLayer;
}) {
  useMapObjectState(visualisationLayer.id);
  useOpenMapItem(visualisationLayer.id, visualisationLayer.source);

  return null;
}

interface Props {
  visualisationLayer: IVisualisationLayer;
  activeFilters: ActiveFilters;
  data: FeatureCollection<Geometry, GeoJsonProperties>;
}

export function MapLayer({ visualisationLayer, activeFilters, data }: Props) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const source = sources[visualisationLayer.source];

  return (
    <>
      {visualisationLayer.openable && (
        <ClickableLayer visualisationLayer={visualisationLayer} />
      )}
      {visualisationLayer.type === "marker-image" ? (
        <MarkersLayer
          visualisationLayer={visualisationLayer}
          activeFilters={activeFilters}
          data={data}
        />
      ) : (
        <Layer {...getLayerProps(visualisationLayer, source)} />
      )}
    </>
  );
}
