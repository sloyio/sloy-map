import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtersSelector, sourcesSelector } from "@/state/selectors";
import { groupByProperty } from "@/helpers/groupByProperty";
import { FilterRange } from "@/filters/FilterBuildingRange";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { FilterGrid } from "@/filters/FilterGrid";
import { updateFilterParams } from "@/state/slice";
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
        sortType: filter.sortType,
      }).map((item) => ({
        type: item.type,
        subTitle: item.count,
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
        />
      );
    }

    case "boolean": {
      return (
        <FilterGrid
          items={[
            {
              type: filter.title,
              subTitle: data.features?.length,
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
