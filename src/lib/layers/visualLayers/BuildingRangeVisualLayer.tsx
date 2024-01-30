import { useEffect } from "react";
import { MinMax } from "sloy-ui";
import { useMap } from "react-map-gl";
import { useAppSelector } from "@/state";
import { setBuildingRangeStyle } from "@/layers/visualLayers/setBuildingStyle";
import { IVisualisationLayer, SourcePropertyRange } from "@/types";
import { ClickableBuilding } from "@/layers/visualLayers/useClickableBuilding";
import { getProperty } from "dot-prop";

interface Props {
  visualisationLayer: IVisualisationLayer;
  range?: MinMax;
}

export function BuildingRangeVisualLayer({ visualisationLayer, range }: Props) {
  const { sloyMapGl } = useMap();
  const sources = useAppSelector((state) => state.sloy.config.sources);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();
    const property = visualisationLayer.property;

    if (!property) return;

    const rangeData = getProperty(
      sources,
      `${visualisationLayer.source}.properties.${property}.values`,
    );

    if (!rangeData || !range) return;

    setBuildingRangeStyle({
      map,
      field: property,
      rangeData: rangeData as SourcePropertyRange[],
      range,
    });
  }, [
    sloyMapGl,
    range,
    sources,
    visualisationLayer.property,
    visualisationLayer.source,
  ]);

  if (visualisationLayer.openable) {
    return <ClickableBuilding sourceId={visualisationLayer.source} />;
  }

  return null;
}
