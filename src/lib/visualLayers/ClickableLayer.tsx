import { Layer } from "react-map-gl";
import { useAppSelector } from "@/state";
import { ActiveFilters, IVisualisationLayer } from "@/types";
import { getLayerProps } from "@/visualLayers/getLayerProps";
import useMapObjectState from "@/visualLayers/useMapObjectState";
import { useOpenMapItem } from "@/visualLayers/useOpenMapItem";
import { MarkersVisualisationLayer } from "./MarkersVisualisationLayer";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

function ClickableVisualisationLayer({
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

export function MapVisualisationLayer({
  visualisationLayer,
  activeFilters,
  data,
}: Props) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const source = sources[visualisationLayer.source];

  return (
    <>
      {visualisationLayer.openable && (
        <ClickableVisualisationLayer visualisationLayer={visualisationLayer} />
      )}
      {visualisationLayer.type === "marker-image" ? (
        <MarkersVisualisationLayer
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
