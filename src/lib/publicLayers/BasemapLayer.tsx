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
  // filters: [
  //   {
  //     source: BESEMAP_TERRAIN_SOURCE.id,
  //     type: "boolean",
  //     filterVisualisationLayers: TERRAIN_VISUALISATION_LAYERS.map((l) => l.id),
  //     property: "?",
  //   },
  // ],
};

export const BASEMAP_SOURCES: InputSloySource[] = [CONTOUR_SOURCE];
export const BASEMAP_LAYERS: InputSloyLayer[] = [
  {
    title: "Контуры",
    visualisationLayers: CONTOUR_VISUALISATION_LAYERS,
    filters: [],
    // filters: [
    //   {
    //     source: CONTOUR_SOURCE.id,
    //     type: "boolean",
    //     filterVisualisationLayers: CONTOUR_VISUALISATION_LAYERS.map(
    //       (l) => l.id,
    //     ),
    //     property: "?",
    //   },
    // ],
  },
];
