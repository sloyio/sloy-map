import { ISource, IVisualisationLayer } from "@/types";
import { getLayerStateStyle } from "../../helpers/getLayerStyle";
import { colorLuminance } from "../../helpers/colorLuminance";

const isHex = (color: string) => /^#[0-9A-F]{6}$/i.test(color);

function withHover(visualisationLayer: IVisualisationLayer, property: string) {
  const paintColor = visualisationLayer.mapLayerProps?.paint?.[property];

  if (!paintColor || !property || visualisationLayer.property) return undefined;

  return paintColor && visualisationLayer.openable && isHex(paintColor)
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
  visualisationLayer: IVisualisationLayer,
  values: [string, any][],
) {
  const colors = visualisationLayer.property
    ? values.map(([value, { color }]) => [
        ["==", ["to-string", ["get", visualisationLayer.property]], value],
        visualisationLayer.openable
          ? getLayerStateStyle<string>({
              initial: color,
              hover: colorLuminance(color, 0.2),
              active: colorLuminance(color, 0.4),
            })
          : color,
      ])
    : [];

  return visualisationLayer.property
    ? ["case"].concat(...colors).concat(["rgba(0, 0, 0, 0)"])
    : undefined;
}

export function getLayerProps(
  visualisationLayer: IVisualisationLayer,
  source: ISource,
): any {
  const property = source?.properties?.[String(visualisationLayer.property)];
  const values = Object.entries(property?.values || {}) || [];

  const props = {
    id: visualisationLayer.id,
    source: visualisationLayer.source,
    ...visualisationLayer.mapLayerProps,
  };

  switch (visualisationLayer.mapLayerProps?.type) {
    case "circle": {
      return {
        ...props,
        paint: {
          "circle-color": withPropertyColors(visualisationLayer, values),
          "circle-stroke-color": "#000",
          ...visualisationLayer.mapLayerProps?.paint,
          ...withHover(visualisationLayer, "circle-color"),
        },
      };
    }
    case "line": {
      return {
        ...props,
        paint: {
          "line-color": withPropertyColors(visualisationLayer, values),
          ...visualisationLayer.mapLayerProps?.paint,
          ...withHover(visualisationLayer, "line-color"),
        },
      };
    }

    case "fill":
      return {
        ...props,
        paint: {
          "fill-color": withPropertyColors(visualisationLayer, values),
          ...visualisationLayer.mapLayerProps?.paint,
          ...withHover(visualisationLayer, "fill-color"),
        },
      };

    default: {
      return props;
    }
  }
}
