import { IApp } from "@/types";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export type IBasemapMapLayer = { id: string; active: boolean };

export interface ISloyState {
  activeLayers: string[];
  activeCard: {
    visualizationId: string;
    id?: string;
    lng?: string;
    lat?: string;
  } | null;
  activeFilterParams: any;
  config: IApp;
  locale: string;
  appLoaded: boolean;
  basemap: {
    mapLayers: { id: string; active: boolean }[];
  };
}

export interface State {
  sloy: ISloyState;
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
