import { useContext } from "react";
import { MapboxMap, useMap } from "react-map-gl";
import { MapContext } from "@/state/context";
import { MapRef } from "react-map-gl/dist/esm/mapbox/create-ref";

export const useSloyGl = (): MapRef<MapboxMap> | undefined =>
  useMap()?.sloyMapGl;

export const useSloyMap = (): any => useSloyGl()?.getMap();

export const useMapContext = () => useContext(MapContext);
