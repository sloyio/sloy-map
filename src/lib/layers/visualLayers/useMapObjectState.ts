import type { Map } from "maplibre-gl";
import { FeatureIdentifier, MapMouseEvent } from "maplibre-gl";
import { Point, useMap } from "react-map-gl";
import { useEffect, useRef } from "react";

function setObjectState(
  map: Map,
  mapObject: FeatureIdentifier,
  settings: { [key: string]: boolean },
  cursorPointer = true,
) {
  map.getCanvas().style.cursor = cursorPointer ? "pointer" : "default";
  map.setFeatureState(mapObject, settings);
}

function useMapObjectState(
  layerId: string,
  onClick?: (e: MapMouseEvent) => void,
) {
  const { sloyMapGl } = useMap();
  const activeObject = useRef<FeatureIdentifier | null>(null);
  const hoverObject = useRef<FeatureIdentifier | null>(null);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map) {
      return;
    }

    const getItem = (point: Point) =>
      map.queryRenderedFeatures(point, { layers: [layerId] })[0];

    const handleClick = (e: MapMouseEvent) => {
      const item = getItem(e.point);

      if (activeObject.current && item.id !== activeObject.current.id) {
        setObjectState(map, activeObject.current, { active: false });
        activeObject.current = null;
      }

      if (item) {
        activeObject.current = item;
        setObjectState(map, activeObject.current as FeatureIdentifier, {
          active: true,
        });
      }

      onClick?.(e);
    };

    const handleMouseMove = (e: MapMouseEvent) => {
      const item = getItem(e.point);
      if (item) {
        if (hoverObject.current && item.id !== hoverObject.current.id) {
          setObjectState(map, hoverObject.current, { hover: false }, false);
        }
        hoverObject.current = item;
        setObjectState(map, item, { hover: true });
      }
    };

    const handleMouseLeave = () => {
      if (hoverObject?.current?.id) {
        setObjectState(map, hoverObject.current, { hover: false }, false);
      }
      hoverObject.current = null;
    };

    map.on("click", layerId, handleClick);
    map.on("mousemove", layerId, handleMouseMove);
    map.on("mouseleave", layerId, handleMouseLeave);

    return () => {
      map.off("click", layerId, handleClick);
      map.off("mousemove", layerId, handleMouseMove);
      map.off("mouseleave", layerId, handleMouseLeave);
    };
  }, [layerId, onClick, sloyMapGl]);

  return hoverObject.current;
}

export default useMapObjectState;
