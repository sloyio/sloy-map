import { IFilter } from "..";

function getPercentageValue(
  count: number | undefined,
  total: number | undefined
): string | null {
  if (typeof count !== "number" || typeof total !== "number") {
    return null;
  }

  const percentage = Math.round(count / (total / 100));

  return percentage < 1 ? "<1" : String(percentage);
}

export function useTotal(
  type: IFilter["totalType"],
  total: number | undefined,
  subTitle: IFilter["subTitle"]
) {
  if (type === "percent") {
    return {
      headerSubtitle: subTitle ? subTitle : "%",
      getItemSubtitle: (count: number | undefined) =>
        getPercentageValue(count, total),
    };
  }

  return {};
}
