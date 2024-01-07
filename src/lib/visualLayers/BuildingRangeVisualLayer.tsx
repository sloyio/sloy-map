import { useEffect } from "react";
import { MinMax } from "sloy-ui";
import { useMap } from "react-map-gl";
import { useSelector } from "react-redux";
import { setBuildingRangeStyle } from "@/helpers/setBuildingStyle";
import { IVisualisationLayer, SourcePropertyRange } from "@/types";
import { ClickableBuilding } from "@/helpers/useClickableBuilding";
import { sourcesSelector } from "@/state/selectors";
import { getProperty } from "dot-prop";

interface Props {
  visualisationLayer: IVisualisationLayer;
  range?: MinMax;
}

export function BuildingRangeVisualLayer({ visualisationLayer, range }: Props) {
  const { sloyMapGl } = useMap();
  const sources = useSelector(sourcesSelector);

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
