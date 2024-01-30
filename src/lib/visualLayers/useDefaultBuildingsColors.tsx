import { useEffect } from "react";
import { useMap } from "react-map-gl";
import { usePrevious } from "@uidotdev/usehooks";
import { setBuildingDefaultColor } from "./setBuildingStyle";
import { useAppSelector } from "@/state";

export function useDefaultBuildingsColors() {
  const { sloyMapGl } = useMap();
  const layers = useAppSelector((state) => state.sloy.config.layers);
  const activeLayer = useAppSelector((state) => state.sloy.activeLayer);
  const visualisationLayers = useAppSelector(
    (state) => state.sloy.config.visualisationLayers,
  );
  const prevActiveLayer = usePrevious(activeLayer);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    const hasActiveBuildingLayerNow =
      activeLayer &&
      layers[activeLayer]?.visualisationLayers
        .map((id) => visualisationLayers[id].type)
        .some((type) => ["building-range", "building-ids"].includes(type));

    const hasActiveBuildingLayerBefore =
      prevActiveLayer &&
      layers[prevActiveLayer]?.visualisationLayers
        .map((id) => visualisationLayers[id].type)
        .some((type) => ["building-range", "building-ids"].includes(type));

    // if we had buildings before but not now
    if (hasActiveBuildingLayerBefore && !hasActiveBuildingLayerNow) {
      setBuildingDefaultColor(map);
    }
  }, [activeLayer, layers, prevActiveLayer, sloyMapGl, visualisationLayers]);

  return null;
}
