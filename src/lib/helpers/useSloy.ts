import { useContext } from "react";
import { useMap } from "react-map-gl";
import { MapContext } from "@/state/MapProvider";

export const useSloyGl = () => useMap()?.sloyMapGl;

export const useSloyMap = () => useSloyGl()?.getMap();

export const useMapContext = () => useContext(MapContext);
