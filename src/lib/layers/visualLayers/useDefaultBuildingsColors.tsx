import { useCallback, useEffect } from "react";
import { useMap } from "react-map-gl";
import { usePrevious } from "@uidotdev/usehooks";
import { setBuildingDefaultColor } from "./setBuildingStyle";
import { useAppSelector } from "@/state";

export function useDefaultBuildingsColors() {
  const { sloyMapGl } = useMap();
  const layers = useAppSelector((state) => state.sloy.config.layers);
  const activeLayers = useAppSelector((state) => state.sloy.activeLayers);
  const visualisationLayers = useAppSelector(
    (state) => state.sloy.config.visualisationLayers,
  );
  const getActiveVisualisationLayers = useCallback(
    (activeLayersIds: string[]) =>
      (activeLayersIds || [])
        .map((id) => layers[id].visualisationLayers)
        .flat()
        .map((id) => visualisationLayers[id].type)
        .some((type) => ["building-range", "building-ids"].includes(type)),
    [layers, visualisationLayers],
  );

  const prevActiveLayer = usePrevious(activeLayers);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    const hasActiveBuildingLayerNow =
      getActiveVisualisationLayers(activeLayers);

    const hasActiveBuildingLayerBefore =
      getActiveVisualisationLayers(prevActiveLayer);

    // if we had buildings before but not now
    if (hasActiveBuildingLayerBefore && !hasActiveBuildingLayerNow) {
      setBuildingDefaultColor(map);
    }
  }, [
    activeLayers,
    getActiveVisualisationLayers,
    layers,
    prevActiveLayer,
    sloyMapGl,
    visualisationLayers,
  ]);

  return null;
}
