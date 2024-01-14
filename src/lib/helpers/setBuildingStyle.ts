import type { Map } from "maplibre-gl";
import { MinMax } from "sloy-ui";
import { BUILDING_LAYER_ID, DEFAULT_BULDING_COLOR_NORMAL } from "@/constants";
import { getLayerStyle } from "./getLayerStyle";
import { colorLuminance } from "./colorLuminance";
import { SourcePropertyRange } from "@/types";

interface SetBuildingStyleProps {
  map: Map;
  color: any;
  caseCondition?: (string | string[])[];
  layerProps?: Record<string, any>;
}

export function setBuildingColor({
  map,
  color,
  caseCondition = ["has", "_unknown_"],
  layerProps,
}: SetBuildingStyleProps) {
  map?.setStyle({
    ...map?.getStyle(),
    layers: map?.getStyle().layers.map((layer: any) => {
      if (layer.id === BUILDING_LAYER_ID) {
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

export function setBuildingDefaultColor(map: Map) {
  setBuildingColor({ map, color: DEFAULT_BULDING_COLOR_NORMAL });
}

export function setBuildingStyleByPropertyValues({
  map,
  property,
  values,
  color,
}: {
  map: Map;
  property: string;
  values: string[];
  color: string;
}) {
  if (!values.length || !property || !map) {
    return;
  }

  map.setStyle({
    ...map?.getStyle(),
    layers: map?.getStyle().layers.map((layer: any) => {
      if (layer.id === BUILDING_LAYER_ID) {
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
}: {
  map: Map;
  field: string;
  range: MinMax;
  rangeData: SourcePropertyRange[];
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
    setBuildingDefaultColor(map);
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
    color: getLayerStyle<any>({
      initial: getColor(colorsInitial),
      hover: getColor(colorsHover),
      active: getColor(colorsActive),
    }),
    caseCondition: ["has", field],
  });
}
