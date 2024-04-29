import { ISource, IVisualization, SourceProperty } from "@/types";
import { getLayerStateStyle } from "../../../helpers/getLayerStyle";
import { colorLuminance } from "../../../helpers/colorLuminance";
import {
  getColorMatchExpression,
  getColorRangeExpression,
} from "./getColorsFromRange";

const isHex = (color: string) => /^#[0-9A-F]{6}$/i.test(color);

function withHover(visualization: IVisualization, property: string) {
  const paintColor = visualization.mapLayerProps?.paint?.[property];

  if (!paintColor || !property || visualization.property) return undefined;

  return paintColor && visualization.openable && isHex(paintColor)
    ? {
        [property]: getLayerStateStyle<string>({
          initial: paintColor,
          hover: colorLuminance(paintColor, 0.25),
          active: colorLuminance(paintColor, 0.5),
        }),
      }
    : {
        [property]: paintColor,
      };
}

function withPropertyColors(
  visualization: IVisualization,
  property?: SourceProperty,
) {
  const defaultColor = "rgba(0, 0, 0, 0)";

  if (visualization.property) {
    if (property?.values) {
      return getColorMatchExpression({
        values: property?.values,
        property: visualization.property,
        openable: visualization.openable,
        defaultColor,
      });
    }

    if (property?.range) {
      return getColorRangeExpression({
        ranges: property?.range,
        property: visualization.property,
        openable: visualization.openable,
        defaultColor,
      });
    }
  }

  return;
}

export function getLayerProps(
  visualization: IVisualization,
  source: ISource,
): any {
  const property = source?.properties?.[String(visualization.property)];

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
          "circle-color": withPropertyColors(visualization, property),
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
          "line-color": withPropertyColors(visualization, property),
          ...visualization.mapLayerProps?.paint,
          ...withHover(visualization, "line-color"),
        },
      };
    }

    case "fill":
      return {
        ...props,
        paint: {
          "fill-color": withPropertyColors(visualization, property),
          ...visualization.mapLayerProps?.paint,
          ...withHover(visualization, "fill-color"),
        },
      };

    default: {
      return props;
    }
  }
}
