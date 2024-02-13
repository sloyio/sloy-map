import { InputSloyLayer, InputSloySource } from "@/types";
import {
  CONTOUR_SOURCE,
  CONTOUR_VISUALISATIONS,
  TERRAIN_SOURCE,
  TERRAIN_VISUALISATIONS,
} from "./ContourVisualization";

export const BESEMAP_TERRAIN_SOURCE: InputSloySource = TERRAIN_SOURCE;
export const BESEMAP_TERRAIN_LAYER: InputSloyLayer = {
  id: "base-terrain",
  title: "3D",
  visualizations: TERRAIN_VISUALISATIONS,
  filters: [],
};

export const BASEMAP_SOURCES: InputSloySource[] = [CONTOUR_SOURCE];
export const BASEMAP_LAYERS: InputSloyLayer[] = [
  {
    id:"base-contours",
    title: "Contours",
    visualizations: CONTOUR_VISUALISATIONS,
    filters: [],
  },
];
