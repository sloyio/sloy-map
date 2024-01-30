import { useDefaultBuildingsColors } from "@/layers/visualLayers/useDefaultBuildingsColors";
import { VisualisationLayer } from "./VisualisationLayer";
import { useAppSelector } from "@/state";
import { Suspense } from "react";

export function VisualisationLayers() {
  const activeLayer = useAppSelector((state) => state.sloy.activeLayer);
  const layers = useAppSelector((state) => state.sloy.config.layers);

  useDefaultBuildingsColors();

  if (!activeLayer) return null;

  return (
    <Suspense fallback={null}>
      {layers[activeLayer]?.visualisationLayers.map((vId) => (
        <VisualisationLayer key={vId} id={vId} />
      ))}
    </Suspense>
  );
}
