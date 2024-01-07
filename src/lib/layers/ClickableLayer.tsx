import { Layer } from "react-map-gl";
import { useSelector } from "react-redux";
import { ActiveFilters, IVisualisationLayer } from "@/types";
import { sourcesSelector } from "@/state/selectors";
import { getLayerProps } from "@/helpers/getLayerProps";
import useMapObjectState from "@/helpers/useMapObjectState";
import { useOpenMapItem } from "@/helpers/useOpenMapItem";
import { MarkersLayer } from "./MarkersLayer";

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
}

export function MapLayer({ visualisationLayer, activeFilters }: Props) {
  const sources = useSelector(sourcesSelector);
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
        />
      ) : (
        <Layer {...getLayerProps(visualisationLayer, source)} />
      )}
    </>
  );
}
