import { useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { useAppSelector } from "@/state";
import { MapContext } from "@/state/MapProvider";
import { BUILDING_LAYER_ID } from "@/constants";
import { BaseCard } from "./BaseCard";
import { useCard } from "@/state/useCard";

export function BuildingCard() {
  const { card, cardLngLat, cardSource } = useCard();
  const { sloyMapGl } = useMap();
  const { overrideCard } = useContext(MapContext);
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);
  const [buildingValues, setBuildingValues] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (map && cardLngLat) {
      const house = map.queryRenderedFeatures(map.project(cardLngLat), {
        layers: [BUILDING_LAYER_ID],
      })?.[0]?.properties;

      setBuildingValues(house);
    }
  }, [cardLngLat, sloyMapGl]);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    // center map only on loading step
    if (map && cardLngLat && !isAppLoaded) {
      try {
        map.flyTo({ center: cardLngLat });
      } catch (error) {
        console.error(error);
      }
    }
  }, [sloyMapGl, isAppLoaded, cardLngLat]);

  if (!cardSource || !card || !buildingValues) return null;

  return (
    <BaseCard
      source={cardSource}
      card={card}
      values={buildingValues}
      lngLat={cardLngLat}
      overrideCard={overrideCard}
    />
  );
}
