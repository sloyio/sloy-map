import { useDefaultBuildingsColors } from "@/layers/visualLayers/useDefaultBuildingsColors";
import { VisualisationLayer } from "./VisualisationLayer";
import { useAppSelector } from "@/state";

export function VisualisationLayers() {
  const activeLayer = useAppSelector((state) => state.sloy.activeLayer);
  const layers = useAppSelector((state) => state.sloy.config.layers);

  useDefaultBuildingsColors();

  if (!activeLayer) return null;

  return (
    <>
      {layers[activeLayer]?.visualisationLayers.map((vId) => (
        <VisualisationLayer key={vId} id={vId} />
      ))}
    </>
  );
}
