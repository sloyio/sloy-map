import { useAppSelector } from "@/state";
import { BuildingRangeVisualLayer } from "@/layers/visualLayers/BuildingRangeVisualLayer";
import { IVisualisationLayer } from "@/types";
import { BuldingsIdsVisualLayer } from "./BuldingsIdsVisualLayer";
import {
  useActiveFilters,
  useVisualisationLayerFilters,
} from "./useVisualisationLayerFilters";
import { LoadedVisualisationLayer } from "./LoadedVisualisationLayer";

export function VisualisationLayer({
  id: vId,
}: {
  id: IVisualisationLayer["id"];
}) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const visualisationLayers = useAppSelector(
    (state) => state.sloy.config.visualisationLayers,
  );

  const visualisationLayer = visualisationLayers[vId];
  const source = sources[visualisationLayer?.source];

  const activeFilters = useActiveFilters({ vId });

  useVisualisationLayerFilters({ vId, activeFilters });

  if (!visualisationLayer || !source) {
    return null;
  }

  switch (visualisationLayer.type) {
    case "building-ids":
      return <BuldingsIdsVisualLayer visualisationLayer={visualisationLayer} />;
    case "building-range": {
      const range = activeFilters.find(
        (f) => f.filter.property === visualisationLayer.property,
      )?.values;

      return (
        <BuildingRangeVisualLayer
          visualisationLayer={visualisationLayer}
          range={range}
        />
      );
    }
    default: {
      return <LoadedVisualisationLayer vId={vId} />;
    }
  }
}
