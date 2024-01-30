import { useEffect } from "react";
import { useMap } from "react-map-gl";
import { setBuildingStyleByPropertyValues } from "@/layers/visualLayers/setBuildingStyle";
import { IBuildingIdsVisualisationLayer } from "@/types";
import { ClickableBuilding } from "@/layers/visualLayers/useClickableBuilding";

interface Props {
  visualisationLayer: IBuildingIdsVisualisationLayer;
}

export default function BuldingsIdsVisualLayer({ visualisationLayer }: Props) {
  const { sloyMapGl } = useMap();
  console.log(visualisationLayer.mapLayerProps);
  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    setBuildingStyleByPropertyValues({
      map,
      property: "osm:id",
      values: visualisationLayer.ids || [],
      color: visualisationLayer.mapLayerProps?.paint?.["fill-extrusion-color"],
    });
  }, [sloyMapGl, visualisationLayer.ids, visualisationLayer.mapLayerProps]);

  if (visualisationLayer.openable) {
    return <ClickableBuilding sourceId={visualisationLayer.source} />;
  }

  return null;
}
