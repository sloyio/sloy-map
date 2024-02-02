import { useContext, useEffect, useMemo } from "react";
import { activeVisualisationLayerSelector } from "./layers/visualLayers/selectors";
import { useAppSelector } from "./state";
import { MapContext } from "./state/MapProvider";
import { useSloyMap } from "./helpers/useSloy";
import { IVisualisationLayer } from "./types";

export function Init() {
  const map = useSloyMap();
  const { terrainSource } = useContext(MapContext);
  const activeVisualisationLayers: IVisualisationLayer[] = useAppSelector(
    activeVisualisationLayerSelector,
  );

  const shouldShowTerrain = useMemo(
    () => activeVisualisationLayers.some((v) => v.source === terrainSource),
    [activeVisualisationLayers, terrainSource],
  );

  useEffect(() => {
    if (map && terrainSource) {
      if (shouldShowTerrain) {
        map.setTerrain({
          source: terrainSource,
          exaggeration: 1,
        });
      } else {
        map.setTerrain(null);
      }
    }
  }, [map, shouldShowTerrain, terrainSource]);

  return null;
}
