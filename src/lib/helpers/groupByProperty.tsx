import { IFilter } from "@/types";
import { FeatureCollection } from "geojson";
import groupBy from "lodash/groupBy";

export function groupByProperty({
  geojson,
  property = "type",
  valueType,
  sortType = "default",
}: {
  geojson: FeatureCollection;
  property: string;
  valueType?: string;
  sortType?: IFilter["sortType"];
}): { type: string; count: number }[] {
  let result;

  if (valueType === "string[]") {
    result = Array.from(
      new Set(
        geojson.features.map((item) => item.properties?.[property]).flat(2),
      ),
    ).map((category) => [
      category,
      geojson.features.filter((item) =>
        item.properties?.[property]?.includes(category),
      ),
    ]);
  } else {
    result = Object.entries(
      groupBy(geojson.features, (item) => item.properties?.[property]),
    );
  }

  let results = result.map(([type, items]) => ({ type, count: items.length }));

  if (sortType === "count") {
    return results.sort((a, b) => b.count - a.count);
  } else {
    return results;
  }
}
