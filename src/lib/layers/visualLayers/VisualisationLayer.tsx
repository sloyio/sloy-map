import { useAppSelector } from "@/state";
import { IVisualisationLayer } from "@/types";
import {
  useActiveFilters,
  useVisualisationLayerFilters,
} from "./useVisualisationLayerFilters";
import { lazy } from "react";

const LazyBuldingsIdsVisualLayer = lazy(
  () => import("@/layers/visualLayers/BuldingsIdsVisualLayer"),
);
const LazyBuildingRangeVisualLayer = lazy(
  () => import("@/layers/visualLayers/BuildingRangeVisualLayer"),
);
const LazyLoadedVisualisationLayer = lazy(
  () => import("@/layers/visualLayers/LoadedVisualisationLayer"),
);
const LazyMarkersVisualisationLayer = lazy(
  () => import("@/layers/visualLayers/MarkersVisualisationLayer"),
);

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
      return (
        <LazyBuldingsIdsVisualLayer visualisationLayer={visualisationLayer} />
      );
    case "building-range": {
      const range = activeFilters.find(
        (f) => f.filter.property === visualisationLayer.property,
      )?.values;

      return (
        <LazyBuildingRangeVisualLayer
          visualisationLayer={visualisationLayer}
          range={range}
        />
      );
    }
    case "marker-image": {
      return (
        <LazyMarkersVisualisationLayer
          visualisationLayer={visualisationLayer}
          activeFilters={activeFilters}
        />
      );
    }
    case "map":
      return <LazyLoadedVisualisationLayer vId={vId} />;
    default:
      return null;
  }
}
