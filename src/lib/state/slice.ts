import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "@/state";
import { IApp, ILayer } from "@/types";

export const initialState: State["sloy"] = {
  activeLayer: [],
  activeFilterParams: null,
  activeCard: null,
  config: {
    copyright: {},
    cards: {},
    sources: {},
    layers: {},
    filters: {},
    visualisationLayers: {},
    mapState: {
      mapStyle: "",
      initialViewState: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
        pitch: 0,
        bearing: 0,
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
    setCard(state, action: PayloadAction<State["sloy"]["activeCard"]>) {
      state.activeCard = action.payload;
    },
    setConfig(state, action: PayloadAction<IApp>) {
      state.config = action.payload;
    },
    updateLayer(
      state,
      action: PayloadAction<{
        layerId: string;
        layer: Partial<ILayer>;
      }>,
    ) {
      const { layerId, layer = {} } = action.payload;
      if (state.config.layers[layerId]) {
        Object.keys(layer).forEach((key) => {
          // @ts-expect-error
          if (layer && layer[key]) {
            // @ts-expect-error
            state.config.layers[layerId][key] = layer[key];
          }
        });
      }
    },
    updateFilterParams(
      state,
      action: PayloadAction<State["sloy"]["activeFilterParams"]>,
    ) {
      state.activeFilterParams = {
        ...state.activeFilterParams,
        ...action.payload,
      };
    },
    toggleLayers(state, action: PayloadAction<State["sloy"]["activeLayer"]>) {
      state.activeLayer = action.payload;
    },
  },
});

export const {
  setAppLoaded,
  setConfig,
  toggleLayers,
  setCard,
  updateFilterParams,
  updateLayer,
} = sloySlice.actions;

export const sloyReducer = sloySlice.reducer;
