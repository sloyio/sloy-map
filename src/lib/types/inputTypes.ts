import {
  ICard,
  IFilter,
  ILayer,
  ISource,
  IVisualisationLayer,
  SourceProperty,
} from "./types";

export type InputCard = Omit<ICard, "id">;

export type InputSource = Omit<ISource, "card" | "properties"> & {
  card: InputCard;
  properties: SourceProperty[];
};

export type InputFilter = Omit<IFilter, "id">;

export type InputVisualisationLayer = IVisualisationLayer;

export type InputLayer = Omit<
  ILayer,
  "id" | "filters" | "visualisationLayers"
> & {
  filters: InputFilter[];
  visualisationLayers: InputVisualisationLayer[];
};
