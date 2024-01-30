import { IApp, IFilter, IVisualisationLayer, ILayer } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import deepmerge from "deepmerge";

type InputFilter = Omit<IFilter, "id">;
type InuputVisualisationLayer = IVisualisationLayer;

export type InputLayer = Omit<
  ILayer,
  "id" | "filters" | "visualisationLayers"
> & {
  filters: InputFilter[];
  visualisationLayers: InuputVisualisationLayer[];
};

interface LayerOutput {
  layers: IApp["layers"];
  filters: IApp["filters"];
  visualisationLayers: IApp["visualisationLayers"];
}

export function createLayer(layer: InputLayer): LayerOutput {
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

export function createLayers(layers: InputLayer[]): LayerOutput {
  return deepmerge.all<LayerOutput>(layers.map(createLayer));
}
