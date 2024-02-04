import useMapObjectState from "@/layers/visualization/helpers/useMapObjectState";
import { useCard } from "@/state/useCard";
import { useMapContext } from "@/helpers/useSloy";

export function ClickableBuilding({
  visualizationId,
}: {
  visualizationId: string;
}) {
  const { layout } = useMapContext();
  const { openCard } = useCard();

  useMapObjectState(layout.buildingLayerName, (e) => {
    openCard({
      visualizationId,
      lat: String(e.lngLat.lat),
      lng: String(e.lngLat.lng),
    });
  });

  return null;
}
