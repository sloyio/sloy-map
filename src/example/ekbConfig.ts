import { ICopyright, InputSloyLayer, InputSloySource } from "@/types";
import { ekbCrimes, ekbCrimesSource } from "./configs/ekb/ekbCrimes";
import {
  ekbDeisgnCode,
  ekbDesignCodeSource,
} from "./configs/ekb/ekbDesignCode";
import { ekbDtp, ekbDtpSource } from "./configs/ekb/ekbDtp";
import { ekbFacades } from "./configs/ekb/ekbFacades";
import {
  ekbHouseAge,
  ekbHouseHealth,
  ekbHouseLevels,
  ekbHouseSource,
} from "./configs/ekb/ekbHouse";
import { ekbLineSource, ekbLines } from "./configs/ekb/ekbLines";
import { ekbOkn, ekbOknSources } from "./configs/ekb/ekbOkn";
import { ekbQuarter, ekbQuarterSource } from "./configs/ekb/ekbQuarter";
import { MAX_ZOOM, MIN_ZOOM } from "./constants";

const EKB_VIEW = {
  center: [60.6099, 56.83898],
  zoom: 14.5,
  pitch: 0,
  bearing: 0,
};

export const defaultMapState = {
  initialViewState: {
    ...EKB_VIEW,
    longitude: EKB_VIEW.center[0],
    latitude: EKB_VIEW.center[1],
  },
  mapStyle: "https://sloy.io/ekaterinburg/style.json",
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  // maxBounds: [40.721512, 37.51153, 49.609451, 42.222066],
};

export const defaultSources: InputSloySource[] = [
  ekbHouseSource,
  ...ekbLineSource,
  ekbDesignCodeSource,
  ...ekbOknSources,
  ekbDtpSource,
  ekbQuarterSource,
  ekbCrimesSource,
];

export const defaultLayers: InputSloyLayer[] = [
  ekbHouseAge,
  ekbHouseLevels,
  ekbHouseHealth,
  ekbOkn,
  ekbDeisgnCode,
  ekbDtp,
  ekbLines,
  ekbQuarter,
  ekbFacades,
  ekbCrimes,
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
  {
    id: "okn",
    shortName: "Объекты культурного наследия Свердловской области",
    fullName: "Объекты культурного наследия Свердловской области",
    url: "https://okn.midural.ru/kategorii/obekty-kulturnogo-naslediya-sverdlovskoy-oblasti",
    requiredAttribution: false,
  },
  {
    id: "howoldthishouse",
    shortName: "Карта возраста домов",
    fullName: "Карта возраста домов",
    url: "https://how-old-is-this.house/",
    requiredAttribution: false,
  },
  {
    id: "domaekb",
    shortName: "Жилые дома Екатеринбурга",
    fullName: "Жилые дома Екатеринбурга",
    url: "https://domaekb.ru",
    requiredAttribution: false,
  },
  {
    id: "mingkh",
    shortName: "МинЖКХ",
    fullName: "МинЖКХ",
    url: "https://mingkh.ru",
    requiredAttribution: false,
  },
  {
    id: "ekbDesignCode",
    shortName: "Дизайн-код Ектеринбурга",
    fullName: "Дизайн-код Ектеринбурга",
    url: "https://ekaterinburg.design",
    requiredAttribution: false,
  },
  {
    id: "dtp",
    shortName: "Карта ДТП",
    fullName: "Карта ДТП",
    url: "https://dtp-stat.ru/",
    requiredAttribution: false,
  },
  {
    id: "ekbQuarter",
    shortName: "екатеринбург.рф",
    fullName: "екатеринбург.рф",
    url: "https://екатеринбург.рф/справка/квартальные",
    requiredAttribution: false,
  },
  {
    id: "ekbDesignCodeMap",
    shortName: "Карта объектов «Дизайн-кода»",
    fullName: "Карта объектов «Дизайн-кода»",
    url: "https://map.ekaterinburg.design",
    requiredAttribution: false,
  },
];
