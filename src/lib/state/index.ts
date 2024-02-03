import { IApp } from "@/types";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export type IBasemapMapLayer = { id: string; active: boolean };

export interface ISloyState {
  activeLayers: string[];
  activeCard: {
    visualisationLayerId: string;
    id?: string;
    lng?: string;
    lat?: string;
  } | null;
  activeFilterParams: any;
  config: IApp;
  appLoaded: boolean;
  basemap: {
    mapLayers: { id: string; active: boolean }[];
  };
}

export interface State {
  sloy: ISloyState;
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
