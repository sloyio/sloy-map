import { useEffect } from "react";
import { useMap } from "react-map-gl";
import { setBuildingStyleByPropertyValues } from "@/layers/visualLayers/setBuildingStyle";
import { IBuildingIdsVisualisationLayer } from "@/types";
import { ClickableBuilding } from "@/layers/visualLayers/ClickableBuilding";

interface Props {
  visualisationLayer: IBuildingIdsVisualisationLayer;
}

export default function BuldingsIdsVisualLayer({ visualisationLayer }: Props) {
  const { sloyMapGl } = useMap();

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
    return <ClickableBuilding visualisationLayerId={visualisationLayer.id} />;
  }

  return null;
}
