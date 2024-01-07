import { useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { useSelector } from "react-redux";
import {
  cardsSelector,
  isAppLoadedSelector,
  sourcesSelector,
} from "@/state/selectors";
import { MapContext } from "@/state/MapProvider";
import { usePopup } from "@/state/usePopup";
import { getLatLngFromHash } from "@/helpers/hash";
import { BUILDING_LAYER_ID } from "@/constants";
import { BaseCard } from "./BaseCard";

interface HouseObject {
  id: string;
  coordinates: [number, number][];
  attributes: Record<string, string>;
}

export function BuildingCard() {
  const { popupHash, sourceIdValue } = usePopup();
  const { sloyMapGl } = useMap();
  const { overrideCard } = useContext(MapContext);
  const isAppLoaded = useSelector(isAppLoadedSelector);
  const sources = useSelector(sourcesSelector);
  const cards = useSelector(cardsSelector);
  const [lat, lng] = (popupHash || "").split("_");
  const [placemark, setPlacemark] = useState<HouseObject | null>(null);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map || !popupHash || !isAppLoaded) {
      return;
    }

    try {
      const [lat, lng] = getLatLngFromHash();

      const house = map.queryRenderedFeatures(
        map.project({ lat: +lat, lng: +lng }),
        {
          layers: [BUILDING_LAYER_ID],
        },
      )?.[0]?.properties;

      if (!house) return;

      setPlacemark({
        id: popupHash,
        coordinates: [[+lat, +lng]],
        attributes: house,
      });
    } catch (error) {
      console.error(error);
    }
  }, [sloyMapGl, popupHash, isAppLoaded]);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (!map || !popupHash) {
      return;
    }

    // center map only on loading step
    if (!isAppLoaded) {
      try {
        map.flyTo({ center: { lat: +lat, lng: +lng } });
      } catch (error) {
        console.error(error);
      }
    }
  }, [sloyMapGl, popupHash, lat, lng, isAppLoaded]);

  const source = sources[String(sourceIdValue)];
  const card = cards[String(source?.card)];

  if (!source) return null;

  return (
    <BaseCard
      source={source}
      card={card}
      values={placemark?.attributes}
      coordinates={[+lat, +lng]}
      overrideCard={overrideCard}
    />
  );
}
