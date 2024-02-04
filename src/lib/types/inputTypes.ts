import {
  ICard,
  IFilter,
  ILayer,
  ISource,
  IVisualisationLayer,
  SourceProperty,
} from "./types";

export type InputSloyCard = Omit<ICard, "id">;

export type InputSloySource = Omit<ISource, "card" | "properties"> & {
  card: InputSloyCard;
  properties: SourceProperty[];
};

export type InputSloyFilter = Omit<IFilter, "id">;

export type InputSloyVisualisationLayer = IVisualisationLayer;

export type InputSloyLayer = Omit<
  ILayer,
  "id" | "filters" | "visualizations"
> & {
  filters: InputSloyFilter[];
  visualizations: InputSloyVisualisationLayer[];
};
