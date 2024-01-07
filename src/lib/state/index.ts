import { IApp } from "@/types";

export interface State {
  sloy: {
    activeLayer: string | null;
    activeFilterParams: any;
    config: IApp;
    appLoaded: boolean;
  };
}
