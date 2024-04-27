import { BuildingCard } from "@/sources/cards/BuildingCard";
import { useCard } from "@/state/useCard";
import { RenderJsonCard } from "./RenderJsonCard";
import { VectorPointCard } from "./VectorPointCard";
import { useMapContext } from "@/helpers/useSloy";
import {
  VECTOR_TILES_BUILDING_SOURCE_ID,
  VECTOR_TILES_SOURCE_ID,
} from "@/constants";

export function useRenderCard() {
  const { cardSource } = useCard();
  const { layout } = useMapContext();

  if (layout.inspect || cardSource?.id === VECTOR_TILES_SOURCE_ID) {
    return <VectorPointCard />;
  }

  if (cardSource?.id === VECTOR_TILES_BUILDING_SOURCE_ID) {
    return <BuildingCard />;
  }

  if (cardSource) {
    return <RenderJsonCard source={cardSource} />;
  }

  return null;
}
