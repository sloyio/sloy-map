import { setCard } from "@/state/slice";
import { useEffect } from "react";
import { useMap } from "react-map-gl";
import { useDispatch } from "react-redux";

export function useOpenMapItem(visualizationId: string) {
  const { sloyMapGl } = useMap();
  const dispatch = useDispatch();

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) return;

    function open(e: any) {
      const item = e.target.queryRenderedFeatures(e.point)[0] || {};

      if (item) {
        dispatch(
          setCard({
            visualizationId,
            id: item.properties?.id || item.id,
            lat: String(e.lngLat.lat),
            lng: String(e.lngLat.lng),
          }),
        );
      }
    }

    map.on?.("click", visualizationId, open);

    return () => {
      map.off?.("click", visualizationId, open);
    };
  }, [sloyMapGl, visualizationId, dispatch]);
}
