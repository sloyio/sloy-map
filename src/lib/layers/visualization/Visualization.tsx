import { useAppSelector } from "@/state";
import { IVisualisationLayer } from "@/types";
import {
  useActiveFilters,
  useVisualisationFilters,
} from "./helpers/useVisualisationFilters";
import { lazy } from "react";

const LazyBuldingsIdsVisualization = lazy(
  () => import("@/layers/visualization/BuldingsIdsVisualization"),
);
const LazyBuildingRangeVisualization = lazy(
  () => import("@/layers/visualization/BuildingRangeVisualization"),
);
const LazyLoadedVisualisationLayer = lazy(
  () => import("@/layers/visualization/LoadedVisualization"),
);
const LazyMarkersVisualisationLayer = lazy(
  () => import("@/layers/visualization/MarkersVisualization"),
);

export function Visualization({ id: vId }: { id: IVisualisationLayer["id"] }) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const visualizations = useAppSelector(
    (state) => state.sloy.config.visualizations,
  );

  const visualization = visualizations[vId];
  const source = sources[visualization?.source];

  const activeFilters = useActiveFilters({ vId });

  useVisualisationFilters({ vId, activeFilters });

  if (!visualization || !source) {
    return null;
  }

  switch (visualization.type) {
    case "building-ids":
      return <LazyBuldingsIdsVisualization visualization={visualization} />;
    case "building-range": {
      const range = activeFilters.find(
        (f) => f.filter.property === visualization.property,
      )?.values;

      return (
        <LazyBuildingRangeVisualization
          visualization={visualization}
          range={range}
        />
      );
    }
    case "marker-image": {
      return (
        <LazyMarkersVisualisationLayer
          visualization={visualization}
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
