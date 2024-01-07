import { useEffect } from "react";
import { useMap } from "react-map-gl";
import { usePopup } from "../state/usePopup";

export function useOpenMapItem(layerId: string, mapItemType: string) {
  const sloyMapGl = useMap();
  const { openPopup } = usePopup();

  useEffect(() => {
    const map = sloyMapGl?.current;

    if (!map) return;

    function open(e: any) {
      const item = e.target.queryRenderedFeatures(e.point)[0];

      openPopup(item.properties?.id || item.id, mapItemType);
    }

    map.on?.("click", layerId, open);

    return () => {
      map.off?.("click", layerId, open);
    };
  }, [sloyMapGl, layerId, mapItemType, openPopup]);
}
