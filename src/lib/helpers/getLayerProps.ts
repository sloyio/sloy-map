import { ISource, IVisualisationLayer } from "@/types";

export function getLayerProps(
  visualisationLayer: IVisualisationLayer,
  source: ISource,
): any {
  const property = source?.properties?.[String(visualisationLayer.property)];
  const values = Object.entries(property?.values || {}) || [];

  const props = {
    id: visualisationLayer.id,
    type: visualisationLayer.type,
    source: visualisationLayer.source,
  };

  switch (visualisationLayer.type) {
    case "circle": {
      const colors = values.map(([value, { color }]) => [
        ["==", ["get", visualisationLayer.property], value],
        color,
      ]);

      return {
        ...props,
        paint: {
          // @ts-ignore
          "circle-color": ["case"]
            .concat(...colors)
            .concat(["rgba(0, 0, 0, 0)"]),
          "circle-stroke-color": "#000",
          ...visualisationLayer.paint,
        },
      };
    }
    case "line": {
      const colors = values.map(([value, { color }]) => [
        ["==", ["get", visualisationLayer.property], value],
        color,
      ]);

      return {
        ...props,
        paint: {
          // @ts-ignore
          "line-color": ["case"].concat(...colors).concat(["rgba(0, 0, 0, 0)"]),
          ...visualisationLayer.paint,
        },
      };
    }

    case "heatmap":
    case "fill":
      return {
        ...props,
        // @ts-ignore
        paint: visualisationLayer.paint,
      };
  }

  return null;
}
