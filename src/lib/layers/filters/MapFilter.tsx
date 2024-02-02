import { Suspense, lazy, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { groupByProperty } from "@/helpers/groupByProperty";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { FilterGrid } from "@/layers/filters/FilterGrid";
import { updateFilterParams, updateLayer } from "@/state/slice";
import { MapLoader } from "@/components/MapLoader";
import { getProperty } from "dot-prop";
import { useAppSelector } from "@/state";

const LazyFilterRange = lazy(
  () => import("@/layers/filters/FilterBuildingRange"),
);

export function MapFilter({
  layerId,
  filterId,
}: {
  layerId: string;
  filterId: string;
}) {
  const dispatch = useDispatch();
  const filters = useAppSelector((state) => state.sloy.config.filters);
  const sources = useAppSelector((state) => state.sloy.config.sources);

  const filter = filters[filterId];
  const source = sources[filter?.source];
  const { data, loading } = useLoadGeoJSON(source);

  useEffect(() => {
    if (data.features.length) {
      dispatch(
        updateLayer({
          layerId,
          layer: {
            subTitle: String(data.features.length),
          },
        }),
      );
    }
  }, [data.features.length, dispatch, layerId]);

  const onChange = useCallback(
    (params: unknown) => {
      dispatch(updateFilterParams({ [filterId]: params }));
    },
    [dispatch, filterId],
  );

  if (!filter || !source) {
    return null;
  }

  if (loading || !data) {
    return <MapLoader />;
  }

  switch (filter.type) {
    case "range":
      return (
        <Suspense fallback={null}>
          <LazyFilterRange filter={filter} onChange={onChange} />
        </Suspense>
      );
    case "string[]":
    case "string": {
      const values = getProperty(
        source,
        `properties.${filter.property}.values`,
      );

      const items = groupByProperty({
        geojson: data,
        property: filter.property,
        valueType: getProperty(source, `properties.${filter.property}.type`),
      }).map((item) => ({
        type: item.type,
        title: getProperty(
          values,
          `${item.type?.replaceAll(".", "\\.")}.title`,
        ),
        count: item.count,
        color: getProperty(
          values,
          `${item.type?.replaceAll(".", "\\.")}.color`,
        ),
        description: getProperty(
          values,
          `${item.type?.replaceAll(".", "\\.")}.description`,
        ),
      }));

      const selectedByDefault = items.map((item) => item.type);

      return (
        <FilterGrid
          items={items}
          selectedByDefault={selectedByDefault}
          onChange={onChange}
          sortType={filter.sortType}
          sortByArray={values ? Object.keys(values) : undefined}
        />
      );
    }

    case "boolean": {
      return (
        <FilterGrid
          sortType={filter.sortType}
          onChange={onChange}
          items={[
            {
              type: filter.title,
              count: data.features?.length,
              description: filter.description,
              color: filter.color,
            },
          ]}
        />
      );
    }

    default:
      return null;
  }
}
