import useMapObjectState from "@/layers/visualLayers/useMapObjectState";
import { BUILDING_LAYER_ID } from "@/constants";
import { useCard } from "@/state/useCard";

export function ClickableBuilding({
  visualisationLayerId,
}: {
  visualisationLayerId: string;
}) {
  const { openCard } = useCard();

  useMapObjectState(BUILDING_LAYER_ID, (e) => {
    openCard({
      visualisationLayerId,
      lngLat: [String(e.lngLat.lng), String(e.lngLat.lat)],
    });
  });

  return null;
}
