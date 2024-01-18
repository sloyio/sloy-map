import { useCallback } from "react";
import { HistogramData, MinMax } from "sloy-ui";
import { useSelector } from "react-redux";
import { RangeBaseFilter } from "@/filters/RangeBaseFilter";
import { IFilter, SourcePropertyRange } from "@/types";
import { sourcesSelector } from "@/state/selectors";
import { getProperty } from "dot-prop";

interface Props {
  filter: IFilter;
  onChange: (range: MinMax) => void;
}

export function FilterRange({ filter, onChange }: Props) {
  const sources = useSelector(sourcesSelector);
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
    <RangeBaseFilter
      defaultMin={defaultMin}
      defaultMax={defaultMax}
      onChangeCallback={onChange}
      getHistogramData={getHistogramData}
    />
  );
}