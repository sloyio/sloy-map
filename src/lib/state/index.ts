import { IApp } from "@/types";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export interface State {
  sloy: {
    activeLayer: string | null;
    activeCard: {
      visualisationLayerId: string;
      id?: string;
      lngLat?: string[] | null;
    } | null;
    activeFilterParams: any;
    config: IApp;
    appLoaded: boolean;
  };
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
