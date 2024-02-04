import { useCallback, useEffect } from "react";
import { useMap } from "react-map-gl";
import { usePrevious } from "@uidotdev/usehooks";
import { setBuildingDefaultColor } from "./setBuildingStyle";
import { useAppSelector } from "@/state";
import { useMapContext } from "@/helpers/useSloy";

export function useDefaultBuildingsColors() {
  const { sloyMapGl } = useMap();
  const layers = useAppSelector((state) => state.sloy.config.layers);
  const activeLayers = useAppSelector((state) => state.sloy.activeLayers);
  const { layout } = useMapContext();
  const visualizations = useAppSelector(
    (state) => state.sloy.config.visualizations,
  );
  const getActiveVisualizations = useCallback(
    (activeLayersIds: string[]) =>
      (activeLayersIds || [])
        .map((id) => layers[id]?.visualizations || [])
        .flat()
        .map((id) => visualizations[id].type)
        .some((type) => ["building-range", "building-ids"].includes(type)),
    [layers, visualizations],
  );

  const prevActiveLayer = usePrevious(activeLayers);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    const hasActiveBuildingLayerNow = getActiveVisualizations(activeLayers);

    const hasActiveBuildingLayerBefore =
      getActiveVisualizations(prevActiveLayer);

    // if we had buildings before but not now
    if (hasActiveBuildingLayerBefore && !hasActiveBuildingLayerNow) {
      setBuildingDefaultColor({ map, buildingLayer: layout.buildingLayerName });
    }
  }, [
    activeLayers,
    getActiveVisualizations,
    layers,
    layout.buildingLayerName,
    prevActiveLayer,
    sloyMapGl,
    visualizations,
  ]);

  return null;
}
