import { useEffect, useState } from "react";
import { RangeHistogram, HistogramData, MinMax } from "sloy-ui";
import { FilterLoader } from "@/layers/filters/FilterLoader";

export interface RangeBaseFilterProps {
  defaultMin: number;
  defaultMax: number;
  units?: string;
  onChangeCallback: (range: MinMax) => Promise<void> | void;
  getHistogramData: () => Promise<HistogramData>;
  noLoader?: boolean;
}

export function FilterRangeBase({
  defaultMin,
  defaultMax,
  units,
  onChangeCallback,
  getHistogramData,
  noLoader,
}: RangeBaseFilterProps) {
  const [rangeData, setRangeData] = useState<HistogramData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getHistogramData().then((data: HistogramData) => {
      setRangeData(data);
      setLoading(false);
    });
  }, [getHistogramData]);

  if (loading) {
    if (noLoader) {
      return null;
    }

    return <FilterLoader />;
  }

  return (
    <RangeHistogram
      data={rangeData}
      onChange={onChangeCallback}
      width="auto"
      height={128}
      defaultMin={defaultMin}
      defaultMax={defaultMax}
      units={units}
    />
  );
}
