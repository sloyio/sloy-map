import { useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import { useAppSelector } from "@/state";
import { MapContext } from "@/state/MapProvider";
import { BaseCard } from "./BaseCard";
import { useCard } from "@/state/useCard";

export function BuildingCard() {
  const { card, cardLng, cardLat, cardSource } = useCard();
  const { sloyMapGl } = useMap();
  const { overrideCard, layout } = useContext(MapContext);
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);
  const [buildingValues, setBuildingValues] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    if (map && cardLat && cardLng) {
      const house = map.queryRenderedFeatures(
        map.project({ lat: cardLat, lng: cardLng }),
        {
          layers: [layout.buildingLayerName],
        },
      )?.[0]?.properties;

      setBuildingValues(house);
    }
  }, [sloyMapGl, cardLat, cardLng, layout.buildingLayerName]);

  useEffect(() => {
    const map = sloyMapGl?.getMap?.();

    // center map only on loading step
    if (map && cardLat && cardLng && !isAppLoaded) {
      try {
        map.flyTo({ center: { lat: cardLat, lng: cardLng } });
      } catch (error) {
        console.error(error);
      }
    }
  }, [sloyMapGl, isAppLoaded, cardLat, cardLng]);

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
