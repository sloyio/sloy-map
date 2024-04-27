import { BaseCard } from "./BaseCard";
import { useMapContext, useSloyMap } from "@/helpers/useSloy";
import { useAppSelector } from "@/state";
import { useActiveItems } from "@/state/selectors";
import { useCard } from "@/state/useCard";
import { ICard, ISource } from "@/types";
import { useEffect, useMemo } from "react";

export function VectorPointCard({
  firstProperties,
  activeSource,
  activeCard,
}: {
  firstProperties?: { [name: string]: any };
  activeCard?: ICard;
  activeSource?: ISource;
}) {
  const map = useSloyMap();
  const { overrideCard } = useMapContext();
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);
  const { cardLng, cardLat } = useCard();

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

  if (!firstProperties || !activeSource) return null;

  return (
    <BaseCard
      source={activeSource}
      values={firstProperties}
      card={activeCard}
      lng={cardLng}
      lat={cardLat}
      overrideCard={overrideCard}
    />
  );
}

export function useVectorPointCard() {
  const map = useSloyMap();
  const { layout } = useMapContext();
  const { cardLng, cardLat } = useCard();
  const cards = useAppSelector((state) => state.sloy.config.cards);

  const { activeVectorLayers, activeSources } = useActiveItems();

  const displayFeatures = useMemo(() => {
    const params =
      //show all for inspect mode
      !layout.inspect && activeVectorLayers?.length
        ? { layers: activeVectorLayers }
        : undefined;

    const features =
      cardLng && cardLat
        ? map?.queryRenderedFeatures(map.project([cardLng, cardLat]), params)
        : [];

    return features?.map((feat: any) => {
      const displayFeat = {};
      ["source", "sourceLayer", "properties"].forEach((prop) => {
        // @ts-ignore
        displayFeat[prop] = feat[prop];
      });
      return displayFeat;
    });
  }, [activeVectorLayers, cardLat, cardLng, layout.inspect, map]);

  const firstFeature = displayFeatures?.[0];
  const firstProperties = firstFeature?.properties;
  const activeSource = activeSources.find(
    (s) => s.vectorSource === firstFeature?.source || "baremaps",
  );

  const activeCardId = activeSource?.card;
  const activeCard = activeCardId ? cards[activeCardId] : undefined;

  return {
    firstFeature,
    firstProperties,
    activeSource,
    activeCard,
  };
}
