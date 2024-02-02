import { State } from "@/state";
import { IVisualisationLayer } from "@/types";
import { createSelector } from "@reduxjs/toolkit";

export const activeVisualisationLayerSelector = createSelector(
  (state: State) => state.sloy.activeLayers,
  (state: State) => state.sloy.config,
  (
    activeLayersIds: State["sloy"]["activeLayers"],
    config: State["sloy"]["config"],
  ): IVisualisationLayer[] =>
    (activeLayersIds || [])
      .map((id) => config.layers[id].visualisationLayers)
      .flat()
      .map((vId) => config.visualisationLayers[vId]),
);
