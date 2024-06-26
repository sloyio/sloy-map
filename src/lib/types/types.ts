import { ComponentProps, ReactNode } from "react";
import MapGl, { Source, Layer } from "react-map-gl";

export type SourcePropertyRange = {
  from: number;
  to: number;
  value?: number;
  color: string;
};

type InitialViewState = Partial<{
  latitude: number;
  longitude: number;
  bearing: number;
  zoom: number;
  pitch: number;
}>;

export type SourcePropertyProperties = Record<
  string,
  {
    color: string;
    title?: string;
    description?: string;
  }
>;

export interface SourceProperty {
  id: string;
  type?: string;
  title?: string;
  values?: SourcePropertyProperties;
  range?: SourcePropertyRange[];
  deps?: string;
}

export interface ICardBlock {
  type: string;
  id?: string;
  deps?: string;
  content?: string;
  dateTimeFormat?: Intl.DateTimeFormatOptions;
  title?: string | null;
  value?: ReactNode;
}

export interface ICard {
  id: string;
  title?: string | string[];
  description?: string | string[];
  additionalInfo?: string[];
  blocks: ICardBlock[];
  cover?: string;
  rootSrc?: string;
}

export interface IBaseSource {
  id: string;
  vectorSource?: string;
  vectorLayer?: string;
  copyright: ICopyright["id"][];
  path?: string;
  dataByIdPath?: string;
  properties?: Record<string, SourceProperty>;
  card?: ICard["id"];
  isCoordsReverse?: boolean;
  coordsProperty?: string;
  latProperty?: string;
  lngProperty?: string;
  projection?: string;
}

export type ICustomSource = IBaseSource & {
  type: "vector-tiles";
  mapSourceProps: Partial<ComponentProps<typeof Source>>;
};

export type IGeoJsonSource = IBaseSource & {
  type: "geojson" | "json";
  mapSourceProps?: undefined;
};

export type ISource = ICustomSource | IGeoJsonSource;

interface IBaseVisualization {
  id: string;
  source: ISource["id"];
  property?: string;
  previewPath?: string;
  rootSrc?: string;
  ids?: string[];
  openable?: boolean;
}

export type INativeMapVisualization = IBaseVisualization & {
  type: "native";
  mapLayerProps?: Partial<ComponentProps<typeof Layer>>;
};

export type IMapVisualization = IBaseVisualization & {
  type: "map";
  mapLayerProps?: Partial<ComponentProps<typeof Layer>>;
};

export type IBuildingIdsVisualization = IBaseVisualization & {
  type: "building-ids";
  mapLayerProps?: Partial<ComponentProps<typeof Layer>>;
};

export type IMarkerImageVisualization = IBaseVisualization & {
  type: "marker-image";
  mapLayerProps?: undefined;
};

export type IBuildingRangeVisualization = IBaseVisualization & {
  type: "building-range";
  mapLayerProps?: undefined;
};

export type IVisualization =
  | INativeMapVisualization
  | IMapVisualization
  | IBuildingRangeVisualization
  | IMarkerImageVisualization
  | IBuildingIdsVisualization;

export interface IFilter {
  id: string;
  source: ISource["id"];
  type: "boolean" | "range" | "string" | "string[]";
  filterVisualizations: IVisualization["id"][];
  sortType?: "config" | "count" | "alphabetical";
  title?: string;
  description?: string;
  color?: string;
  property?: string;
  subTitle?: string;
  postfix?: string;
  totalType?: "percent";
  totalHeader?: "count";
}

export interface ICopyright {
  id: string;
  shortName: string;
  fullName?: string;
  url: string;
  requiredAttribution?: boolean;
}

export interface ILayer {
  id: string;
  title: string;
  filters: IFilter["id"][];
  visualizations: IVisualization["id"][];
  updatedAt?: string;
  subTitle?: string;
  initialViewState?: Partial<
    Omit<InitialViewState, "latitude" | "longitude"> & {
      center?: number[];
    }
  >;
  license?: string;
  description?: string;
  link?: {
    label?: string;
    href?: string;
  };
}

export type IMapProps = Partial<React.ComponentProps<typeof MapGl>>;

export type IMapState = Pick<
  IMapProps,
  | "initialViewState"
  | "mapStyle"
  | "minZoom"
  | "maxZoom"
  | "maxBounds"
  | "maxPitch"
>;

export interface IApp {
  mapState: IMapState;
  copyrights: Record<string, ICopyright>;
  cards: Record<string, ICard>;
  sources: Record<string, ISource>;
  layers: Record<string, ILayer>;
  filters: Record<string, IFilter>;
  visualizations: Record<string, IVisualization>;
}

export type ActiveFilters = {
  filter: IFilter;
  values: any;
}[];
