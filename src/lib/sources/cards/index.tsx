import { useCard } from "@/state/useCard";
import { RenderJsonCard } from "./RenderJsonCard";
import { VectorPointCard, useVectorPointCard } from "./VectorPointCard";

export function useRenderCard() {
  const { cardSource } = useCard();
  const { firstProperties, activeSource, activeCard } = useVectorPointCard();

  if (cardSource?.type === "json" || cardSource?.type === "geojson") {
    return <RenderJsonCard source={cardSource} />;
  }

  if (firstProperties && activeSource) {
    return (
      <VectorPointCard
        firstProperties={firstProperties}
        activeSource={activeSource}
        activeCard={activeCard}
      />
    );
  }

  return null;
}
