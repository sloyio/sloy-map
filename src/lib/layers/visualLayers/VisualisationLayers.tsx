import { useDefaultBuildingsColors } from "@/layers/visualLayers/useDefaultBuildingsColors";
import { VisualisationLayer } from "./VisualisationLayer";
import { useAppSelector } from "@/state";
import { Suspense } from "react";

export function VisualisationLayers() {
  const activeLayers = useAppSelector((state) => state.sloy.activeLayer);
  const layers = useAppSelector((state) => state.sloy.config.layers);
  const activeVisualisationLayers = (activeLayers || [])
    .map((id) => layers[id].visualisationLayers)
    .flat();

  useDefaultBuildingsColors();

  if (!activeLayers) return null;

  return (
    <Suspense fallback={null}>
      {activeVisualisationLayers.map((vId) => (
        <VisualisationLayer key={vId} id={vId} />
      ))}
    </Suspense>
  );
}
