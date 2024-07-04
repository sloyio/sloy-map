import { useEffect } from "react";
import { useMap } from "react-map-gl";
import { useAppSelector } from "@/state";
import { ActiveFilters, IVisualization } from "@/types";
import { VECTOR_TILES_SOURCE_ID } from "@/constants";

export function useActiveFilters({
  vId,
}: {
  vId: IVisualization["id"];
}): ActiveFilters {
  const filters = useAppSelector((state) => state.sloy.config.filters);

  const activeFilterParams = useAppSelector(
    (state) => state.sloy.activeFilterParams,
  );

  return Object.values(filters)
    .filter(
      (f) =>
        f.filterVisualizations.includes(vId) &&
        activeFilterParams?.[f.id] !== undefined,
    )
    .map((f) => ({
      filter: f,
      values: activeFilterParams?.[f.id],
    }));
}

export function useVisualisationFilters({
  vId,
  activeFilters,
}: {
  vId: IVisualization["id"];
  activeFilters: ActiveFilters;
}) {
  const { sloyMapGl } = useMap();

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    const filters: any = ["all"];
    activeFilters.forEach(({ filter, values }) => {
      if (filter.source !== VECTOR_TILES_SOURCE_ID) {
        if (filter.type === "boolean" && map.getLayer(vId)) {
          map.setLayoutProperty(
            vId,
            "visibility",
            values.length > 0 ? "visible" : "none",
          );
        } else if (filter.type === "range") {
          filters.push([
            "all",
            [
              ">=",
              ["to-string", ["get", filter.property]],
              String(values?.min),
            ],
            [
              "<=",
              ["to-string", ["get", filter.property]],
              String(values?.max),
            ],
          ]);
        } else if (filter.type === "string[]") {
          filters.push(
            ["any"].concat(
              values.map((v: string) => [
                "in",
                v,
                ["to-string", ["get", filter.property]],
              ]),
            ),
          );
        } else {
          filters.push([
            "in",
            ["to-string", ["get", filter.property]],
            ["literal", values],
          ]);
        }
      }
    });

    if (map.getLayer(vId)) {
      map.setFilter(vId, filters);
    }
  }, [activeFilters, sloyMapGl, vId]);

  return null;
}
