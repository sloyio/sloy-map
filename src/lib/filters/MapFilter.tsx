import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtersSelector, sourcesSelector } from "@/state/selectors";
import { groupByProperty } from "@/helpers/groupByProperty";
import { FilterRange } from "@/filters/FilterBuildingRange";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { FilterGrid } from "@/filters/FilterGrid";
import { updateFilterParams, updateLayer } from "@/state/slice";
import { MapLoader } from "@/components/MapLoader";
import { getProperty } from "dot-prop";

export function MapFilter({
  layerId,
  filterId,
}: {
  layerId: string;
  filterId: string;
}) {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);
  const sources = useSelector(sourcesSelector);

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
  }, [data.features.length]);

  const onChange = useCallback(
    (params: unknown) => {
      dispatch(
        updateFilterParams({
          activeLayer: layerId,
          activeFilterParams: {
            [filterId]: params,
          },
        }),
      );
    },
    [dispatch, filterId, layerId],
  );

  if (!filter || !source) {
    return null;
  }

  if (loading || !data) {
    return <MapLoader />;
  }

  switch (filter.type) {
    case "range":
      return <FilterRange filter={filter} onChange={onChange} />;
    case "string[]":
    case "string": {
      const items = groupByProperty({
        geojson: data,
        property: filter.property,
        valueType: getProperty(source, `properties.${filter.property}.type`),
      }).map((item) => ({
        type: item.type,
        title: getProperty(
          source,
          `properties.${filter.property}.values.${item.type}.title`,
        ),
        count: item.count,
        color: getProperty(
          source,
          `properties.${filter.property}.values.${item.type}.color`,
        ),
        description: getProperty(
          source,
          `properties.${filter.property}.values.${item.type}.description`,
        ),
      }));

      const selectedByDefault = items.map((item) => item.type);

      return (
        <FilterGrid
          items={items}
          selectedByDefault={selectedByDefault}
          onChange={onChange}
          sortType={filter.sortType}
        />
      );
    }

    case "boolean": {
      return (
        <FilterGrid
          sortType={filter.sortType}
          items={[
            {
              type: filter.title,
              count: data.features?.length,
              description: filter.description,
              color: filter.color,
            },
          ]}
          onChange={onChange}
        />
      );
    }

    default:
      return null;
  }
}
