import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MapMouseEvent } from "react-map-gl";
import { setCard, useMapContext, useSloyMap } from "../../..";
import { VECTOR_TILES_SOURCE_ID } from "@/constants";
import { useAppSelector } from "@/state";

export function VectorPointControl() {
  const map = useSloyMap();
  const {
    layout: { inspect },
  } = useMapContext();
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const hasVectorTilesLayer = Boolean(
    inspect || sources[VECTOR_TILES_SOURCE_ID],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!map || !hasVectorTilesLayer) return;

    function onClick(e: MapMouseEvent) {
      const features = map.queryRenderedFeatures(e.point);

      dispatch(
        setCard({
          visualizationId: VECTOR_TILES_SOURCE_ID,
          id: features.properties?.id || features.id,
          lat: String(e.lngLat.lat),
          lng: String(e.lngLat.lng),
        }),
      );
    }

    map.on("click", onClick);

    return () => {
      map.off("click", onClick);
    };
  }, [dispatch, hasVectorTilesLayer, map]);

  return null;
}
