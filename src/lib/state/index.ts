import { IApp } from "@/types";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export interface State {
  sloy: {
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
  };
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
