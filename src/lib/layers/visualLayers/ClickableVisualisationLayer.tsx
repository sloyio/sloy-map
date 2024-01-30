import { IVisualisationLayer } from "@/types";
import useMapObjectState from "@/layers/visualLayers/useMapObjectState";
import { useOpenMapItem } from "@/layers/visualLayers/useOpenMapItem";

export function ClickableVisualisationLayer({
  visualisationLayer,
}: {
  visualisationLayer: IVisualisationLayer;
}) {
  useMapObjectState(visualisationLayer.id);
  useOpenMapItem(visualisationLayer.id, visualisationLayer.source);

  return null;
}
