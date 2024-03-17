import { BASEMAP_LAYERS, BASEMAP_SOURCES } from "@/layers/public/basemap";
import { ICopyright, InputSloyLayer, InputSloySource } from "@/types";
import { amAdm1Source } from "./configs/am/amAdm1";
import { amAdm2, amAdm2Source } from "./configs/am/amAdm2";
import { amAvalanche, amAvalancheSource } from "./configs/am/amAvalanche";
import { amClimate, amClimateSource } from "./configs/am/amClimate";
import { amForest, amForestSource } from "./configs/am/amForest";
import { amGroundwater, amGroundwaterSource } from "./configs/am/amGroundwater";
import { amLakes, amLakesSource } from "./configs/am/amLakes";
import { amLandUseSource, amLanduse } from "./configs/am/amLandUse";
import { amLandslides, amLandslidesSource } from "./configs/am/amLandslides";
import { amLevels, amLevelsSource } from "./configs/am/amLevels";
import { amMedical, amMedicalSource } from "./configs/am/amMedical";
import { amMineral, amMineralSource } from "./configs/am/amMineral";
import { amPost, amPostSource } from "./configs/am/amPost";
import {
  amPrecipitations,
  amPrecipitationsSource,
} from "./configs/am/amPrecipitations";
import { amRadiation, amRadiationSource } from "./configs/am/amRadiation";
import { amRivers, amRiversSource } from "./configs/am/amRivers";
import { amSeismic, amSeismicSource } from "./configs/am/amSeismic";
import { amSoil, amSoilSource } from "./configs/am/amSoil";
import { amTempAvg, amTempAvgSource } from "./configs/am/amTempAvg";
import { amUnesco, amUnescoSource } from "./configs/am/amUnesco";
import { amVegetation, amVegetationSource } from "./configs/am/amVegetation";
import { amWind, amWindSource } from "./configs/am/amWind";
import { MAX_ZOOM, MIN_ZOOM, YEREVAN_VIEW } from "./constants";

// const ARARAT_VIEW = {
//   center: [44.516, 40.17043],
//   zoom: 13.81,
//   pitch: 81,
//   bearing: -166.7,
// };

export const defaultMapState = {
  initialViewState: {
    ...YEREVAN_VIEW,
    longitude: YEREVAN_VIEW.center[0],
    latitude: YEREVAN_VIEW.center[1],
  },
  mapStyle: "https://sloy.io/armenia/style.json",
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  maxBounds: [40.721512, 37.51153, 49.609451, 42.222066],
};

export const defaultSources: InputSloySource[] = [
  // BESEMAP_TERRAIN_SOURCE,
  ...BASEMAP_SOURCES,
  amLevelsSource,
  amAdm1Source,
  amAdm2Source,
  amUnescoSource,
  amMedicalSource,
  amPostSource,
  amSeismicSource,
  amAvalancheSource,
  amLandslidesSource,
  amSoilSource,
  amLandUseSource,
  amVegetationSource,
  amForestSource,
  amRadiationSource,
  // amSolarRadiationSource,
  amClimateSource,
  amTempAvgSource,
  amPrecipitationsSource,
  amWindSource,
  amLakesSource,
  amGroundwaterSource,
  amMineralSource,
  amRiversSource,
];

export const defaultLayers: InputSloyLayer[] = [
  amLevels,
  // amAdm1,
  amAdm2,
  amUnesco,
  amMedical,
  amPost,
  amSeismic,
  amAvalanche,
  amLandslides,
  amSoil,
  amLanduse,
  amVegetation,
  amForest,
  amRadiation,
  amClimate,
  amTempAvg,
  amPrecipitations,
  amWind,
  amLakes,
  amGroundwater,
  amMineral,
  amRivers,
  // { ...BESEMAP_TERRAIN_LAYER, initialViewState: ARARAT_VIEW },
  ...BASEMAP_LAYERS,
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
    url: "https://www.openstreetmap.org/",
    requiredAttribution: true,
  },
  {
    id: "DCA",
    shortName: "Data Catalog Armenia",
    url: "https://data.opendata.am/",
    requiredAttribution: false,
  },
  {
    id: "HDX",
    shortName: "Humanitarian Data Exchange",
    url: "https://data.humdata.org/",
    requiredAttribution: false,
  },
];

// console.log(extractTranslations(state, translations));
