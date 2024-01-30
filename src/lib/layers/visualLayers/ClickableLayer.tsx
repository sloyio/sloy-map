import { Layer } from "react-map-gl";
import { useAppSelector } from "@/state";
import { IVisualisationLayer } from "@/types";
import { getLayerProps } from "@/layers/visualLayers/getLayerProps";
import { ClickableVisualisationLayer } from "./ClickableVisualisationLayer";

interface Props {
  visualisationLayer: IVisualisationLayer;
}

export function MapVisualisationLayer({ visualisationLayer }: Props) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const source = sources[visualisationLayer.source];

  return (
    <>
      {visualisationLayer.openable && (
        <ClickableVisualisationLayer visualisationLayer={visualisationLayer} />
      )}
      <Layer {...getLayerProps(visualisationLayer, source)} />
    </>
  );
}
