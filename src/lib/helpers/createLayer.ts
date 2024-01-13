import { IApp, IFilter, IVisualisationLayer, ILayer } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import { InputSource, createSources } from "./createSources";

type InputFilter = Omit<IFilter, "id">;
type InuputVisualisationLayer = IVisualisationLayer;
type InputLayer = Omit<ILayer, "id" | "filters" | "visualisationLayers"> & {
  filters: InputFilter[];
  visualisationLayers: InuputVisualisationLayer[];
};

export function createLayer(
  layer: InputLayer,
  sources: InputSource[],
): Omit<IApp, "mapState"> {
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
    copyright: {},
    ...createSources(sources),
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
