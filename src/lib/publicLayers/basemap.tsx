import { InputSloyLayer, InputSloySource } from "@/types";
import {
  CONTOUR_SOURCE,
  CONTOUR_VISUALISATION_LAYERS,
  TERRAIN_SOURCE,
  TERRAIN_VISUALISATION_LAYERS,
} from "./ContourVisualLayer";

export const BESEMAP_TERRAIN_SOURCE: InputSloySource = TERRAIN_SOURCE;
export const BESEMAP_TERRAIN_LAYER: InputSloyLayer = {
  title: "3D",
  visualisationLayers: TERRAIN_VISUALISATION_LAYERS,
  filters: [],
};

export const BASEMAP_SOURCES: InputSloySource[] = [CONTOUR_SOURCE];
export const BASEMAP_LAYERS: InputSloyLayer[] = [
  {
    title: "Contours",
    visualisationLayers: CONTOUR_VISUALISATION_LAYERS,
    filters: [],
  },
];
