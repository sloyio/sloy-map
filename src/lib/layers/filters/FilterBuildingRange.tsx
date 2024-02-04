import { useCallback } from "react";
import { HistogramData, MinMax } from "sloy-ui";
import { useAppSelector } from "@/state";
import { FilterRangeBase } from "@/layers/filters/FilterRangeBase";
import { IFilter, SourcePropertyRange } from "@/types";
import { getProperty } from "dot-prop";

interface Props {
  filter: IFilter;
  onChange: (range: MinMax) => void;
}

export default function FilterRange({ filter, onChange }: Props) {
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const rangeData = getProperty(
    sources,
    `${filter.source}.properties.${filter?.property}.values`,
  ) as SourcePropertyRange[];

  const getHistogramData = useCallback(
    () => Promise.resolve(rangeData) as Promise<HistogramData>,
    [rangeData],
  );

  const defaultMin = Math.min.apply(
    null,
    rangeData?.map((item: SourcePropertyRange) => item.from),
  );
  const defaultMax = Math.max.apply(
    null,
    rangeData?.map((item: SourcePropertyRange) => item.to),
  );

  if (
    typeof defaultMin !== "number" ||
    typeof defaultMax !== "number" ||
    !rangeData
  ) {
    return null;
  }

  return (
    <FilterRangeBase
      defaultMin={defaultMin}
      defaultMax={defaultMax}
      onChangeCallback={onChange}
      getHistogramData={getHistogramData}
    />
  );
}
