import { useMap } from "react-map-gl";

export const useSloyGl = () => useMap()?.sloyMapGl;

export const useSloyMap = () => useSloyGl()?.getMap();
