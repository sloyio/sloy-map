import { getLayerStateStyle } from "@/helpers/getLayerStyle";
import { InputSloyLayer } from "@/types";
import facades from "../../../../public/ekb-facades.json";
import { VECTOR_TILES_BUILDING_SOURCE_ID } from "@/index";

export const ekbFacades: InputSloyLayer = {
  id: "ekb-facades",
  title: "Дизайн-код фасадов",
  filters: [],
  visualizations: [
    {
      id: "ekbFacadesLayer",
      type: "building-ids",
      source: VECTOR_TILES_BUILDING_SOURCE_ID,
      ids: Object.keys(facades),
      openable: true,
      mapLayerProps: {
        type: "fill-extrusion",
        paint: {
          "fill-extrusion-color": getLayerStateStyle<string>({
            initial: "rgba(129, 255, 0, 0.75)",
            hover: "rgba(129, 255, 0, 0.90)",
            active: "rgba(129, 255, 0, 1)",
          }),
        },
      },
    },
  ],
};
