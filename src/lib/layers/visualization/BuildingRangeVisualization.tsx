import { useEffect } from "react";
import { MinMax } from "sloy-ui";
import { useMap } from "react-map-gl";
import { useAppSelector } from "@/state";
import { setBuildingRangeStyle } from "@/layers/visualization/helpers/setBuildingStyle";
import { IVisualization, SourcePropertyRange } from "@/types";
import { ClickableBuilding } from "@/layers/visualization/helpers/ClickableBuilding";
import { getProperty } from "dot-prop";
import { useMapContext } from "@/helpers/useSloy";

interface Props {
  visualization: IVisualization;
  range?: MinMax;
}

export default function BuildingRangeVisualization({
  visualization,
  range,
}: Props) {
  const { sloyMapGl } = useMap();
  const { layout } = useMapContext();
  const sources = useAppSelector((state) => state.sloy.config.sources);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();
    const property = visualization.property;

    if (!property) return;

    const rangeData: SourcePropertyRange[] = getProperty(
      sources,
      `${visualization.source}.properties.${property}.range`,
    );

    if (!rangeData || !range) return;

    setBuildingRangeStyle({
      map,
      field: property,
      rangeData,
      range,
      buildingLayer: layout.buildingLayerName,
    });
  }, [
    sloyMapGl,
    range,
    sources,
    visualization.property,
    visualization.source,
    layout.buildingLayerName,
  ]);

  if (visualization.openable) {
    return <ClickableBuilding visualizationId={visualization.id} />;
  }

  return null;
}
