import { Layer, Source } from "react-map-gl";
import { useAppSelector } from "@/state";
import { IVisualization } from "@/types";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { ClickableVisualization } from "./helpers/ClickableVisualization";
import { getLayerProps } from "./helpers/getLayerProps";

export default function LoadedVisualization({
  vId,
}: {
  vId: IVisualization["id"];
}) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const visualizations = useAppSelector(
    (state) => state.sloy.config.visualizations,
  );
  const visualization = visualizations[vId];
  const source = sources[visualization?.source];

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
      {visualization.openable && (
        <ClickableVisualization visualization={visualization} />
      )}
      <Layer {...getLayerProps(visualization, source)} />
    </>
  );
}
