import { Source } from "react-map-gl";
import { useAppSelector } from "@/state";
import { MapVisualisationLayer } from "@/layers/visualLayers/ClickableLayer";
import { IVisualisationLayer } from "@/types";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { useActiveFilters } from "./useVisualisationLayerFilters";

export function LoadedVisualisationLayer({
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

  const activeFilters = useActiveFilters({ vId });

  if (loading) return null;

  return (
    <>
      <Source id={source.id} type="geojson" data={data} generateId />
      <MapVisualisationLayer
        visualisationLayer={visualisationLayer}
        activeFilters={activeFilters}
        data={data}
      />
    </>
  );
}
