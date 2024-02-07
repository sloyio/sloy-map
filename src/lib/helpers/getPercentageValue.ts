export function getPercentageValue(
  count: number | undefined,
  total: number | undefined
): string | null {
  if (typeof count !== "number" || typeof total !== "number") {
    return null;
  }

  const percentage = Math.round(count / (total / 100));

  return percentage < 1 ? "< 1" : String(percentage);
}
