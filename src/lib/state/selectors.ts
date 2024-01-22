import { State } from "@/state";

export const isAppLoadedSelector = (state: State) => state.sloy.appLoaded;

export const activeLayerSelector = (state: State) => state.sloy.activeLayer;

export const activeFilterParamsSelector = (state: State) =>
  state.sloy.activeFilterParams;

export const cardsSelector = (state: State) => state.sloy.config?.cards;

export const mapStateSelector = (state: State) => state.sloy.config?.mapState;

export const copyrightSelector = (state: State) => state.sloy.config?.copyright;

export const filtersSelector = (state: State) => state.sloy.config?.filters;

export const layersSelector = (state: State) => state.sloy.config?.layers;

export const sourcesSelector = (state: State) => state.sloy.config?.sources;

export const visualisationLayersSelector = (state: State) =>
  state.sloy.config?.visualisationLayers;
