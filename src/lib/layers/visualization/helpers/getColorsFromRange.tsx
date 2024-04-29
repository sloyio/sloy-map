import { colorLuminance } from "@/helpers/colorLuminance";
import { getLayerStateStyle } from "@/helpers/getLayerStyle";
import { SourcePropertyProperties, SourcePropertyRange } from "@/types";

export function getColorRangeExpression({
  ranges,
  property,
  defaultColor = "#000000",
  openable = false,
}: {
  ranges: SourcePropertyRange[];
  property?: string;
  defaultColor?: string;
  openable?: boolean;
}) {
  const expression = ["case"];

  ranges.forEach((range) => {
    expression.push(
      // @ts-expect-error
      ["<=", ["to-number", ["get", property]], range.to],
      openable
        ? getLayerStateStyle<string>({
            initial: range.color,
            hover: colorLuminance(range.color, 0.25),
            active: colorLuminance(range.color, 0.5),
          })
        : range.color,
    );
  });

  expression.push(defaultColor);

  return expression;
}

export function getColorMatchExpression({
  values,
  property,
  defaultColor = "#000000",
  openable = false,
}: {
  values: SourcePropertyProperties;
  property: string;
  defaultColor?: string;
  openable?: boolean;
}) {
  const items = Object.entries(values || {}) || [];

  return ["case"]
    .concat(
      // @ts-expect-error
      ...items.map(([value, { color }]) => [
        ["==", ["to-string", ["get", property]], value],
        openable
          ? getLayerStateStyle<string>({
              initial: color,
              hover: colorLuminance(color, 0.25),
              active: colorLuminance(color, 0.5),
            })
          : color,
      ]),
    )
    .concat([defaultColor]);
}
