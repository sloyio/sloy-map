import { ICopyright, InputSloyLayer, InputSloySource } from "@/types";
import { gorodetsOKN, gorodetsOKNSource } from "./configs/gorodets/gorodetsOKN";
import {
  gorodetsAdminBoundary,
  gorodetsAdminBoundarySource,
} from "./configs/gorodets/gorodetsAdminBoundary";
import {
  gorodetsBoundary,
  gorodetsBoundarySource,
} from "./configs/gorodets/gorodetsBoundary";
import {
  gorodetsEmergencyHousing,
  gorodetsEmergencyHousingSource,
} from "./configs/gorodets/gorodetsEmergencyHousing";
import { gorodetsDTP, gorodetsDTPSource } from "./configs/gorodets/gorodetsDTP";
import { gorodetsKSR, gorodetsKSRSource } from "./configs/gorodets/gorodetsKSR";
import {
  gorodetsRailway,
  gorodetsRailwaySource,
} from "./configs/gorodets/gorodetsRailwayLine";
import {
  gorodetsWetland,
  gorodetsWetlandSource,
} from "./configs/gorodets/gorodetsWetland";
import {
  gorodetsWater,
  gorodetsWaterSource,
} from "./configs/gorodets/gorodetsWater";
import {
  gorodetsLanduse,
  gorodetsLanduseSource,
} from "./configs/gorodets/gorodetsLanduse";
import { gorodetsPZZ, gorodetsPZZSource } from "./configs/gorodets/gorodetsPZZ";
import {
  gorodetsPhotos,
  gorodetsPhotosSource,
} from "./configs/gorodets/gorodetsPhotos";
import {
  gorodetsPopulationPPL,
  gorodetsPopulationPPLSource,
} from "./configs/gorodets/gorodetsPopulationPPL";
import {
  gorodetsBuildings,
  gorodetsBuildingsSource,
} from "./configs/gorodets/gorodetsBuildings";
import {
  gorodetsBuildingsAge,
  gorodetsBuildingsAgeSource,
} from "./configs/gorodets/gorodetsBuildingsAge";
import {
  gorodetsCommerce,
  gorodetsCommerceSource,
} from "./configs/gorodets/gorodetsCommerce";
import {
  gorodetsTouristRoutes,
  gorodetsTouristRoutesSource,
} from "./configs/gorodets/gorodetsTouristRoutes";
import { gorodetsCad, gorodetsCadSource } from "./configs/gorodets/gorodetsCad";
// import {
//  gorodetsPopulation,
//  gorodetsPopulationSource,
// } from "./configs/gorodets/gorodetsPopulation";
// import {
//   gorodetsRoads,
//   gorodetsRoadsSource,
// } from "./configs/gorodets/gorodetsRoads";
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
  mapStyle: "/gorodets-style.json",
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  // maxBounds: [40.721512, 37.51153, 49.609451, 42.222066],
};

export const defaultLayers: InputSloyLayer[] = [
  gorodetsOKN,
  gorodetsAdminBoundary,
  gorodetsBoundary,
  gorodetsEmergencyHousing,
  gorodetsDTP,
  gorodetsKSR,
  gorodetsRailway,
  gorodetsWetland,
  gorodetsWater,
  gorodetsLanduse,
  gorodetsPZZ,
  gorodetsPhotos,
  gorodetsPopulationPPL,
  gorodetsBuildings,
  gorodetsBuildingsAge,
  gorodetsCommerce,
  gorodetsTouristRoutes,
  gorodetsCad,
  // gorodetsPopulation,
  // gorodetsRoads,
];

export const defaultSources: InputSloySource[] = [
  ...gorodetsOKNSource,
  gorodetsAdminBoundarySource,
  gorodetsBoundarySource,
  gorodetsEmergencyHousingSource,
  gorodetsDTPSource,
  gorodetsKSRSource,
  ...gorodetsRailwaySource,
  gorodetsWetlandSource,
  gorodetsWaterSource,
  gorodetsLanduseSource,
  gorodetsPZZSource,
  gorodetsPhotosSource,
  gorodetsPopulationPPLSource,
  gorodetsBuildingsSource,
  gorodetsBuildingsAgeSource,
  gorodetsCommerceSource,
  gorodetsTouristRoutesSource,
  gorodetsCadSource,
  // gorodetsPopulationSource,
  // gorodetsRoadsSource,
];

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
