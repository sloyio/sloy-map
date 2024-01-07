import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFilterTypeFromHash } from "@/helpers/hash";
import { State } from "@/state";
import { IApp } from "@/types";

export interface SetFilterPayload {
  activeLayer: string | null;
  activeFilterParams: any;
}

export const initialState: State["sloy"] = {
  activeLayer: (getFilterTypeFromHash() as string) || "ekbHouseAge",
  activeFilterParams: null,
  config: {
    copyright: {},
    cards: {},
    sources: {},
    layers: {},
    filters: {},
    visualisationLayers: {},
  },
  appLoaded: false,
};

const sloySlice = createSlice({
  name: "sloy",
  initialState,
  reducers: {
    setAppLoaded(state) {
      state.appLoaded = true;
    },
    setConfig(state, action: PayloadAction<IApp>) {
      state.config = action.payload;
    },
    setFilter(state, action: PayloadAction<SetFilterPayload>) {
      const { activeLayer, activeFilterParams } = action.payload;
      state.activeLayer = activeLayer;
      state.activeFilterParams = activeFilterParams;
    },
    setFilterParams(
      state,
      action: PayloadAction<{
        activeFilterParams: any;
      }>,
    ) {
      const { activeFilterParams } = action.payload;
      state.activeFilterParams = activeFilterParams;
    },
    updateFilterParams(
      state,
      action: PayloadAction<{
        activeLayer: string;
        activeFilterParams: any;
      }>,
    ) {
      const { activeFilterParams, activeLayer } = action.payload;
      state.activeLayer = activeLayer;
      state.activeFilterParams = {
        ...state.activeFilterParams,
        ...activeFilterParams,
      };
    },
    toggleData(
      state,
      action: PayloadAction<{
        type: string;
      }>,
    ) {
      const { type } = action.payload;

      state.activeLayer = type === state.activeLayer ? null : type;
      state.activeFilterParams = null;
    },
  },
});

export const {
  setAppLoaded,
  setConfig,
  toggleData,
  setFilter,
  setFilterParams,
  updateFilterParams,
} = sloySlice.actions;

export const sloyReducer = sloySlice.reducer;
