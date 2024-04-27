import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/state";
import { MapContext } from "@/state/context";
import { BaseCard } from "./BaseCard";
import { useCard } from "@/state/useCard";
import { useSloyMap } from "@/helpers/useSloy";

export function BuildingCard() {
  const { card, cardLng, cardLat, cardSource } = useCard();
  const map = useSloyMap();
  const { overrideCard, layout } = useContext(MapContext);
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);
  const [buildingValues, setBuildingValues] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    if (map && cardLat && cardLng) {
      const house = map.queryRenderedFeatures(
        map.project({ lat: cardLat, lng: cardLng }),
        {
          layers: [layout.buildingLayerName],
        },
      )?.[0]?.properties;

      setBuildingValues(house);
    }
  }, [cardLat, cardLng, layout.buildingLayerName, map]);

  useEffect(() => {
    // center map only on loading step
    if (map && cardLat && cardLng && !isAppLoaded) {
      try {
        map.flyTo({ center: { lat: cardLat, lng: cardLng } });
      } catch (error) {
        console.error(error);
      }
    }
  }, [isAppLoaded, cardLat, cardLng, map]);

  if (!cardSource || !card || !buildingValues) return null;

  return (
    <BaseCard
      source={cardSource}
      card={card}
      values={buildingValues}
      lat={cardLat}
      lng={cardLng}
      overrideCard={overrideCard}
    />
  );
}
