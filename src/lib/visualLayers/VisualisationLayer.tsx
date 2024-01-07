import { useEffect } from "react";
import { Source, useMap } from "react-map-gl";
import { useSelector } from "react-redux";
import {
  activeFilterParamsSelector,
  filtersSelector,
  sourcesSelector,
  visualisationLayersSelector,
} from "@/state/selectors";
import { MapLayer } from "@/layers/ClickableLayer";
import { BuildingRangeVisualLayer } from "@/visualLayers/BuildingRangeVisualLayer";
import { ActiveFilters, IVisualisationLayer } from "@/types";
import { setBuildingDefaultColor } from "../helpers/setBuildingStyle";
import { BuldingsIdsVisualLayer } from "./BuldingsIdsVisualLayer";

export function VisualisationLayer({
  id: vId,
}: {
  id: IVisualisationLayer["id"];
}) {
  const { sloyMapGl } = useMap();
  const filters = useSelector(filtersSelector);
  const visualisationLayers = useSelector(visualisationLayersSelector);
  const sources = useSelector(sourcesSelector);

  const visualisationLayer = visualisationLayers[vId];
  const source = sources[visualisationLayer?.source];

  const activeFilterParams = useSelector(activeFilterParamsSelector);

  const activeFilters: ActiveFilters = Object.values(filters)
    .filter(
      (f) =>
        f.filterVisualisationLayers.includes(vId) &&
        activeFilterParams?.[f.id] !== undefined,
    )
    .map((f) => ({
      filter: f,
      values: activeFilterParams?.[f.id],
    }));

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (
      map &&
      visualisationLayer?.type !== "building-range" &&
      visualisationLayer.id !== "ekbFacadesLayer"
    ) {
      setBuildingDefaultColor(map);
    }
  });

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    const filters: any = ["all"];
    activeFilters.forEach(({ filter, values }) => {
      if (filter.source !== "buildingTile") {
        if (filter.type === "boolean" && map.getLayer(vId)) {
          map.setLayoutProperty(
            vId,
            "visibility",
            values.length > 0 ? "visible" : "none",
          );
        } else if (filter.type === "range") {
          filters.push([
            "all",
            [">=", ["get", filter.property], values?.min],
            ["<=", ["get", filter.property], values?.max],
          ]);
        } else if (filter.type === "string[]") {
          filters.push(
            ["any"].concat(
              values.map((v: string) => ["in", v, ["get", filter.property]]),
            ),
          );
        } else {
          filters.push(["in", ["get", filter.property], ["literal", values]]);
        }
      }
    });

    if (map.getLayer(vId)) {
      map.setFilter(vId, filters);
    }
  }, [activeFilters, sloyMapGl, vId]);

  if (!visualisationLayer || !source) {
    return null;
  }

  if (visualisationLayer.type === "building-ids") {
    return <BuldingsIdsVisualLayer visualisationLayer={visualisationLayer} />;
  }

  if (visualisationLayer.type === "building-range") {
    const range = activeFilters.find(
      (f) => f.filter.property === visualisationLayer.property,
    )?.values;

    return (
      <BuildingRangeVisualLayer
        visualisationLayer={visualisationLayer}
        range={range}
      />
    );
  }

  return (
    <Source id={source.id} type="geojson" data={source.path} generateId>
      <MapLayer
        visualisationLayer={visualisationLayer}
        activeFilters={activeFilters}
      />
    </Source>
  );
}
