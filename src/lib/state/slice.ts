import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { IBasemapMapLayer, ISloyState } from "@/state";
import { ILayer } from "@/types";

export const initialState: ISloyState = {
  appLoaded: false,
  activeLayers: [],
  activeFilterParams: null,
  activeCard: null,
  locale: "en-EN",
  basemap: {
    mapLayers: [],
  },
  config: {
    copyrights: {},
    cards: {},
    sources: {},
    layers: {},
    filters: {},
    visualizations: {},
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
};

const sloySlice = createSlice({
  name: "sloy",
  initialState,
  reducers: {
    setAppLoaded(state) {
      state.appLoaded = true;
    },
    updateBasemapLayer(
      state,
      {
        payload: { at, value },
      }: PayloadAction<{ at: number; value: IBasemapMapLayer }>,
    ) {
      state.basemap.mapLayers[at] = value;
    },
    setCard(state, action: PayloadAction<ISloyState["activeCard"]>) {
      state.activeCard = action.payload;
    },
    setLocale(state, action: PayloadAction<ISloyState["locale"]>) {
      state.locale = action.payload;
    },
    init(state, action: PayloadAction<Partial<ISloyState>>) {
      return {
        ...state,
        ...action.payload,
      };
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
      action: PayloadAction<ISloyState["activeFilterParams"]>,
    ) {
      state.activeFilterParams = {
        ...state.activeFilterParams,
        ...action.payload,
      };
    },
    toggleLayers(state, action: PayloadAction<ISloyState["activeLayers"]>) {
      state.activeLayers = Array.from(new Set(action.payload));
    },
  },
});

export const {
  setAppLoaded,
  init,
  toggleLayers,
  setCard,
  updateFilterParams,
  updateLayer,
  updateBasemapLayer,
  setLocale,
} = sloySlice.actions;

export const sloyReducer: Reducer<ISloyState> = sloySlice.reducer;
