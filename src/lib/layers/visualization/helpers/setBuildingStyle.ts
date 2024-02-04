import type { Map } from "maplibre-gl";
import { MinMax } from "sloy-ui";
import { DEFAULT_BULDING_COLOR_NORMAL } from "@/constants";
import { getLayerStateStyle } from "@/helpers/getLayerStyle";
import { colorLuminance } from "@/helpers/colorLuminance";
import { SourcePropertyRange } from "@/types";

interface SetBuildingStyleProps {
  map: Map;
  color: any;
  caseCondition?: (string | string[])[];
  layerProps?: Record<string, any>;
  buildingLayer: string;
}

export function setBuildingColor({
  map,
  color,
  caseCondition = ["has", "_unknown_"],
  layerProps,
  buildingLayer,
}: SetBuildingStyleProps) {
  map?.setStyle({
    ...map?.getStyle(),
    layers: map?.getStyle().layers.map((layer: any) => {
      if (layer.id === buildingLayer) {
        return {
          ...layer,
          ...layerProps,
          paint: {
            ...layer.paint,
            "fill-extrusion-color": [
              "case",
              caseCondition,
              color,
              DEFAULT_BULDING_COLOR_NORMAL,
            ],
            ...layerProps?.paint,
          },
        };
      }
      return layer;
    }),
  });
}

export function setBuildingDefaultColor({
  map,
  buildingLayer,
}: {
  map: Map;
  buildingLayer: string;
}) {
  setBuildingColor({ map, color: DEFAULT_BULDING_COLOR_NORMAL, buildingLayer });
}

export function setBuildingStyleByPropertyValues({
  map,
  property,
  values,
  color,
  buildingLayer,
}: {
  map: Map;
  property: string;
  values: string[];
  color: string;
  buildingLayer: string;
}) {
  if (!values.length || !property || !map) {
    return;
  }

  map.setStyle({
    ...map?.getStyle(),
    layers: map?.getStyle().layers.map((layer: any) => {
      if (layer.id === buildingLayer) {
        return {
          ...layer,
          paint: {
            // @ts-ignore
            ...layer.paint,
            "fill-extrusion-color": [
              "match",
              ["get", property],
              ["literal"].concat(values),
              color,
              DEFAULT_BULDING_COLOR_NORMAL,
            ],
          },
        };
      }
      return layer;
    }),
  });
}

export function setBuildingRangeStyle({
  map,
  range,
  field,
  rangeData,
  buildingLayer,
}: {
  map: Map;
  field: string;
  range: MinMax;
  rangeData: SourcePropertyRange[];
  buildingLayer: string;
}) {
  if (
    !(
      typeof range?.min === "number" &&
      typeof range?.max === "number" &&
      field &&
      rangeData &&
      map
    )
  ) {
    setBuildingDefaultColor({ map, buildingLayer });
    return;
  }

  const colorsInitial: any[] = rangeData
    .map((item) => {
      if (item.from >= range.min && item.to <= range.max) {
        return item;
      }
      return { ...item, color: DEFAULT_BULDING_COLOR_NORMAL };
    })
    .map((item) => [item.from, item.color]);

  const colorsHover: any[] = colorsInitial.map(([from, color]) => [
    from,
    colorLuminance(color, 0.4),
  ]);
  const colorsActive: any[] = colorsInitial.map(([from, color]) => [
    from,
    colorLuminance(color, 0.55),
  ]);

  const getColor = (style: [number, number][]) => [
    "interpolate",
    ["linear"],
    ["to-number", ["get", field]],
    ...style.flat(2),
  ];

  setBuildingColor({
    map,
    color: getLayerStateStyle<any>({
      initial: getColor(colorsInitial),
      hover: getColor(colorsHover),
      active: getColor(colorsActive),
    }),
    caseCondition: ["has", field],
    buildingLayer,
  });
}
