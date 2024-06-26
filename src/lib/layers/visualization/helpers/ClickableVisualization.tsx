import { IVisualization } from "@/types";
import useMapObjectState from "@/layers/visualization/helpers/useMapObjectState";
import { useOpenMapItem } from "@/layers/visualization/helpers/useOpenMapItem";

export function ClickableVisualization({
  visualization,
}: {
  visualization: IVisualization;
}) {
  useMapObjectState(visualization.id);
  useOpenMapItem(visualization.id);

  return null;
}
