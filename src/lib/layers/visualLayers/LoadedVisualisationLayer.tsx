import { Layer, Source } from "react-map-gl";
import { useAppSelector } from "@/state";
import { IVisualisationLayer } from "@/types";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { ClickableVisualisationLayer } from "./ClickableVisualisationLayer";
import { getLayerProps } from "./getLayerProps";

export default function LoadedVisualisationLayer({
  vId,
}: {
  vId: IVisualisationLayer["id"];
}) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const visualisationLayers = useAppSelector(
    (state) => state.sloy.config.visualisationLayers,
  );
  const visualisationLayer = visualisationLayers[vId];
  const source = sources[visualisationLayer?.source];

  const { loading, data } = useLoadGeoJSON(source);

  if (loading || !source) return null;

  return (
    <>
      <Source
        id={source.id}
        type="geojson"
        data={data}
        generateId
        {...source.mapSourceProps}
      />
      {visualisationLayer.openable && (
        <ClickableVisualisationLayer visualisationLayer={visualisationLayer} />
      )}
      <Layer {...getLayerProps(visualisationLayer, source)} />
    </>
  );
}
