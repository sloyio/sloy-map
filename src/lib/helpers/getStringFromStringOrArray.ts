import { getProperty } from "dot-prop";

export const getStringFromStringOrArray = (
  values: Record<string, any>,
  value?: string | string[],
) => {
  if (!value) return undefined;

  return Array.isArray(value)
    ? value
        .map((t) => getProperty(values, t))
        .filter(Boolean)
        .join(". ")
    : getProperty(values, value);
};
