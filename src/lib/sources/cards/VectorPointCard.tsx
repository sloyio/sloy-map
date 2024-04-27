import { BaseCard } from "./BaseCard";
import { useMapContext, useSloyMap } from "@/helpers/useSloy";
import { useCard } from "@/state/useCard";

export function VectorPointCard() {
  const map = useSloyMap();
  const { overrideCard } = useMapContext();

  const { card, cardSource, cardLng, cardLat } = useCard();

  const features = map?.queryRenderedFeatures(map.project([cardLng, cardLat]));

  const displayProperties = ["source", "sourceLayer", "properties"];

  const displayFeatures = features.map((feat: any) => {
    const displayFeat = {};
    displayProperties.forEach((prop) => {
      // @ts-ignore
      displayFeat[prop] = feat[prop];
    });
    return displayFeat;
  });

  const first = displayFeatures?.[0]?.properties;

  console.log(displayFeatures);

  if (!first) return null;

  return (
    <BaseCard
      source={cardSource || undefined}
      values={first}
      card={card || undefined}
      lng={cardLng}
      lat={cardLat}
      overrideCard={overrideCard}
    />
  );
}
