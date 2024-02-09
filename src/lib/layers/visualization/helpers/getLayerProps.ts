import { ISource, IVisualization } from "@/types";
import { getLayerStateStyle } from "../../../helpers/getLayerStyle";
import { colorLuminance } from "../../../helpers/colorLuminance";

const isHex = (color: string) => /^#[0-9A-F]{6}$/i.test(color);

function withHover(visualization: IVisualization, property: string) {
  const paintColor = visualization.mapLayerProps?.paint?.[property];

  if (!paintColor || !property || visualization.property) return undefined;

  return paintColor && visualization.openable && isHex(paintColor)
    ? {
        [property]: getLayerStateStyle<string>({
          initial: paintColor,
          hover: colorLuminance(paintColor, 0.2),
          active: colorLuminance(paintColor, 0.4),
        }),
      }
    : {
        [property]: paintColor,
      };
}

function withPropertyColors(
  visualization: IVisualization,
  values: [string, any][],
) {
  const colors = visualization.property
    ? values.map(([value, { color }]) => [
        ["==", ["to-string", ["get", visualization.property]], value],
        visualization.openable
          ? getLayerStateStyle<string>({
              initial: color,
              hover: colorLuminance(color, 0.2),
              active: colorLuminance(color, 0.4),
            })
          : color,
      ])
    : [];

  return visualization.property
    ? ["case"].concat(...colors).concat(["rgba(0, 0, 0, 0)"])
    : undefined;
}

export function getLayerProps(
  visualization: IVisualization,
  source: ISource,
): any {
  const property = source?.properties?.[String(visualization.property)];
  const values = Object.entries(property?.values || {}) || [];

  const props = {
    id: visualization.id,
    source: visualization.source,
    ...visualization.mapLayerProps,
  };

  switch (visualization.mapLayerProps?.type) {
    case "circle": {
      return {
        ...props,
        paint: {
          "circle-color": withPropertyColors(visualization, values),
          "circle-stroke-color": "#000",
          ...visualization.mapLayerProps?.paint,
          ...withHover(visualization, "circle-color"),
        },
      };
    }
    case "line": {
      return {
        ...props,
        paint: {
          "line-color": withPropertyColors(visualization, values),
          ...visualization.mapLayerProps?.paint,
          ...withHover(visualization, "line-color"),
        },
      };
    }

    case "fill":
      return {
        ...props,
        paint: {
          "fill-color": withPropertyColors(visualization, values),
          ...visualization.mapLayerProps?.paint,
          ...withHover(visualization, "fill-color"),
        },
      };

    default: {
      return props;
    }
  }
}
