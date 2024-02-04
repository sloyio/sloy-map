import { Suspense } from "react";
import { useDefaultBuildingsColors } from "@/layers/visualization/helpers/useDefaultBuildingsColors";
import { useAppSelector } from "@/state";
import { Visualization } from "./Visualization";

export function Visualizations() {
  const activeLayers = useAppSelector((state) => state.sloy.activeLayers);
  const layers = useAppSelector((state) => state.sloy.config.layers);
  const activeVisualizations = (activeLayers || [])
    .map((id) => layers[id]?.visualizations || [])
    .flat();

  useDefaultBuildingsColors();

  if (!activeLayers) return null;

  return (
    <Suspense fallback={null}>
      {activeVisualizations.map((vId) => (
        <Visualization key={vId} id={vId} />
      ))}
    </Suspense>
  );
}
