import { ReactNode } from "react";

export type SourcePropertyRange = {
  from: number;
  to: number;
  value?: number;
  color: string;
};

export type SourcePropertyProperties = Record<
  string,
  {
    color: string;
    description?: string;
  }
>;

export type SourcePropertyValues =
  | SourcePropertyProperties
  | SourcePropertyRange[];

export interface SourceProperty {
  id: string;
  type?: string;
  title?: string;
  values?: SourcePropertyValues;
  deps?: string;
}

export interface ICardBlock {
  type: string;
  id?: string;
  deps?: string;
  content?: string;
  timeFormat?: string;
  title?: string;
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

export interface ISource {
  id: string;
  path?: string;
  dataByIdPath?: string;
  properties?: Record<string, SourceProperty>;
  card?: ICard["id"];
  copyright: Copyright["id"][];
  type: string;
  isCoordsReverse?: boolean;
  coordsProperty?: string;
  latProperty?: string;
  lngProperty?: string;
  projection?: string;
}

export interface IVisualisationLayer {
  id: string;
  type: string;
  source: ISource["id"];
  paint: any;
  property?: string;
  previewPath?: string;
  rootSrc?: string;
  ids?: string[];
  openable?: boolean;
}

export interface IFilter {
  id: string;
  type: string;
  title?: string;
  description?: string;
  color?: string;
  property: string;
  source: ISource["id"];
  filterVisualisationLayers: IVisualisationLayer["id"][];
}

export interface Copyright {
  id: string;
  name: string;
  link: string;
}

export interface ILayer {
  id: string;
  title: string;
  filters: IFilter["id"][];
  visualisationLayers: IVisualisationLayer["id"][];
  defaultZoom?: number;
}

export interface IApp {
  mapState: {
    locale: string;
    initialViewState: {
      latitude: number;
      longitude: number;
      zoom: number;
      pitch: number;
    };
    mapStyle: string;
  };
  copyright: Record<string, Copyright>;
  cards: Record<string, ICard>;
  sources: Record<string, ISource>;
  layers: Record<string, ILayer>;
  filters: Record<string, IFilter>;
  visualisationLayers: Record<string, IVisualisationLayer>;
}

export type ActiveFilters = {
  filter: IFilter;
  values: any;
}[];