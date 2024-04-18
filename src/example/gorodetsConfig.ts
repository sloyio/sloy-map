import { ICopyright, InputSloyLayer, InputSloySource } from "@/types";
import { gorodetsOKN, gorodetsOKNSource } from "./configs/gorodets/gorodetsOKN";
import { MAX_ZOOM, MIN_ZOOM } from "./constants";

const CITY_VIEW = {
  center: [43.4735, 56.644],
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

export const defaultMapState = {
  initialViewState: {
    ...CITY_VIEW,
    longitude: CITY_VIEW.center[0],
    latitude: CITY_VIEW.center[1],
  },
  mapStyle: "https://sloy.io/gorodets/style.json",
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  // maxBounds: [40.721512, 37.51153, 49.609451, 42.222066],
};

export const defaultSources: InputSloySource[] = [gorodetsOKNSource];

export const defaultLayers: InputSloyLayer[] = [gorodetsOKN];

export const copyrights: ICopyright[] = [
  {
    id: "sloy",
    shortName: "sloy.io",
    url: "https://sloy.io/",
    requiredAttribution: true,
  },
  {
    id: "osm",
    shortName: "OpenStreetMap",
    fullName: "OpenStreetMap",
    url: "https://www.openstreetmap.org/",
    requiredAttribution: true,
  },
];
