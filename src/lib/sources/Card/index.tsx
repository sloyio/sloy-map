import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { BuildingCard } from "@/sources/Card/BuildingCard";
import { MapLoader } from "@/components/MapLoader";
import { FeatureCard } from "./FeatureCard";
import { useCard } from "@/state/useCard";
import { ISource } from "@/types";

function RenderJsonCard({ source }: { source: ISource }) {
  const { card, cardId } = useCard();
  const { loading, data } = useLoadGeoJSON({
    ...source,
    path:
      source?.dataByIdPath?.replace("{DATA_BY_ID}", String(cardId)) ||
      source?.path,
  });

  if (loading) {
    return <MapLoader />;
  }

  if (!cardId || !card) {
    return null;
  }

  return (
    <FeatureCard data={data} featureId={cardId} card={card} source={source} />
  );
}

export default function RenderCard() {
  const { cardSource } = useCard();

  if (cardSource?.id === "buildingTile") {
    return <BuildingCard />;
  }

  if (cardSource) {
    return <RenderJsonCard source={cardSource} />;
  }

  return null;
}
