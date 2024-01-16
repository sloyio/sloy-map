import { useEffect } from "react";
import { useMap } from "react-map-gl";
import useMapObjectState from "@/helpers/useMapObjectState";
import { usePopup } from "@/state/usePopup";
import { BUILDING_LAYER_ID } from "@/constants";

interface Props {
  sourceId: string;
}

export function useClickableBuilding({ sourceId }: Props) {
  const { sloyMapGl } = useMap();
  const { openPopup } = usePopup();

  useMapObjectState(BUILDING_LAYER_ID);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    map.on("click", BUILDING_LAYER_ID, (e: any) => {
      openPopup(`${e.lngLat.lat}_${e.lngLat.lng}`, sourceId);
    });
  }, [sloyMapGl, openPopup, sourceId]);

  return null;
}

export function ClickableBuilding(props: Props) {
  useClickableBuilding(props);

  return null;
}
