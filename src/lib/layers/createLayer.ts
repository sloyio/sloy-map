import { IApp, IFilter, IVisualisationLayer, InputSloyLayer } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import deepmerge from "deepmerge";

interface LayerOutput {
  layers: IApp["layers"];
  filters: IApp["filters"];
  visualisationLayers: IApp["visualisationLayers"];
}

export function createLayer(layer: InputSloyLayer): LayerOutput {
  const layerId = nanoid(5);

  const filters = layer.filters.reduce<Record<string, IFilter>>((all, item) => {
    const id = nanoid(5);
    return {
      ...all,
      [id]: { ...item, id },
    };
  }, {});

  const visualisationLayers = layer.visualisationLayers.reduce<
    Record<string, IVisualisationLayer>
  >((all, item) => {
    return {
      ...all,
      [item.id]: item,
    };
  }, {});

  return {
    layers: {
      [layerId]: {
        ...layer,
        id: layerId,
        filters: Object.keys(filters),
        visualisationLayers: Object.keys(visualisationLayers),
      },
    },
    filters,
    visualisationLayers,
  };
}

export function createLayers(layers: InputSloyLayer[]): LayerOutput {
  return deepmerge.all<LayerOutput>(layers.map(createLayer));
}
