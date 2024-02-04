import { BuildingCard } from "@/sources/cards/BuildingCard";
import { useCard } from "@/state/useCard";
import { RenderJsonCard } from "./RenderJsonCard";

export function Card() {
  const { cardSource } = useCard();

  if (cardSource?.id === "buildingTile") {
    return <BuildingCard />;
  }

  if (cardSource) {
    return <RenderJsonCard source={cardSource} />;
  }

  return null;
}
