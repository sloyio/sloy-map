import { IApp, IFilter, IVisualisationLayer, InputSloyLayer } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import deepmerge from "deepmerge";

interface LayerOutput {
  layers: IApp["layers"];
  filters: IApp["filters"];
  visualizations: IApp["visualizations"];
}

export function createLayer(layer: InputSloyLayer): LayerOutput {
  const layerId = encodeURIComponent(layer.title);

  const filters = layer.filters.reduce<Record<string, IFilter>>((all, item) => {
    const id = nanoid(5);
    return {
      ...all,
      [id]: { ...item, id },
    };
  }, {});

  const visualizations = layer.visualizations.reduce<
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
        visualizations: Object.keys(visualizations),
      },
    },
    filters,
    visualizations,
  };
}

export function createLayers(layers: InputSloyLayer[]): LayerOutput {
  return deepmerge.all<LayerOutput>(layers.map(createLayer));
}