import { useEffect } from "react";
import { useMap } from "react-map-gl";
import { setBuildingStyleByPropertyValues } from "@/helpers/setBuildingStyle";
import { IVisualisationLayer } from "@/types";
import { ClickableBuilding } from "@/helpers/useClickableBuilding";

interface Props {
  visualisationLayer: IVisualisationLayer;
}

export function BuldingsIdsVisualLayer({ visualisationLayer }: Props) {
  const { sloyMapGl } = useMap();

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    setBuildingStyleByPropertyValues({
      map,
      property: "osm:id",
      values: visualisationLayer.ids || [],
      color: visualisationLayer.paint["fill-extrusion-color"],
    });
  }, [sloyMapGl, visualisationLayer.ids, visualisationLayer.paint]);

  if (visualisationLayer.openable) {
    return <ClickableBuilding sourceId={visualisationLayer.source} />;
  }

  return null;
}
