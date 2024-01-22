import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFilterTypeFromHash } from "@/helpers/hash";
import { State } from "@/state";
import { IApp, ILayer } from "@/types";
import deepmerge from "deepmerge";

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
    mapState: {
      locale: "en-En",
      mapStyle: "",
      initialViewState: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
        pitch: 0,
      },
    },
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
    updateLayer(
      state,
      action: PayloadAction<{
        layerId: string;
        layer: Partial<ILayer>;
      }>,
    ) {
      const { layerId, layer } = action.payload;
      if (state.config.layers[layerId]) {
        state.config.layers[layerId] = deepmerge<ILayer>(
          state.config.layers[layerId],
          layer,
        );
      }
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
  updateLayer,
} = sloySlice.actions;

export const sloyReducer = sloySlice.reducer;
