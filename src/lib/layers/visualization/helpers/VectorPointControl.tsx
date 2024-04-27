import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MapMouseEvent } from "react-map-gl";
import { setCard, useSloyMap } from "../../..";
import { VECTOR_TILES_SOURCE_ID } from "@/constants";

export function VectorPointControl() {
  const map = useSloyMap();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!map) return;

    function onClick(e: MapMouseEvent) {
      dispatch(
        setCard({
          visualizationId: VECTOR_TILES_SOURCE_ID,
          lat: String(e.lngLat.lat),
          lng: String(e.lngLat.lng),
        }),
      );
    }

    map.on("click", onClick);

    return () => {
      map.off("click", onClick);
    };
  }, [dispatch, map]);

  return null;
}
