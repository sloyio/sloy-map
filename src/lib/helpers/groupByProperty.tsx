import { FeatureCollection } from "geojson";
import groupBy from "lodash/groupBy";

export function groupByProperty(
  geojson: FeatureCollection,
  property: string = "type",
  valueType?: string,
): { type: string; count: number }[] {
  let result;

  if (valueType === "string[]") {
    result = Array.from(
      new Set(
        geojson.features.map((item) => item.properties?.[property]).flat(2),
      ),
    ).map((category) => [
      category,
      geojson.features.filter(
        (item) => item.properties?.[property]?.includes(category),
      ),
    ]);
  } else {
    result = Object.entries(
      groupBy(geojson.features, (item) => item.properties?.[property]),
    );
  }

  return result
    .map(([type, items]) => ({ type, count: items.length }))
    .sort((a, b) => b.count - a.count);
}
