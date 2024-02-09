import { useEffect } from "react";
import { useMap } from "react-map-gl";
import { setBuildingStyleByPropertyValues } from "@/layers/visualization/helpers/setBuildingStyle";
import { IBuildingIdsVisualization } from "@/types";
import { ClickableBuilding } from "@/layers/visualization/helpers/ClickableBuilding";
import { useMapContext } from "@/helpers/useSloy";

interface Props {
  visualization: IBuildingIdsVisualization;
}

export default function BuldingsIdsVisualization({ visualization }: Props) {
  const { sloyMapGl } = useMap();
  const { layout } = useMapContext();

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    setBuildingStyleByPropertyValues({
      map,
      property: "osm:id",
      values: visualization.ids || [],
      color: visualization.mapLayerProps?.paint?.["fill-extrusion-color"],
      buildingLayer: layout.buildingLayerName,
    });
  }, [
    layout.buildingLayerName,
    sloyMapGl,
    visualization.ids,
    visualization.mapLayerProps,
  ]);

  if (visualization.openable) {
    return <ClickableBuilding visualizationId={visualization.id} />;
  }

  return null;
}
