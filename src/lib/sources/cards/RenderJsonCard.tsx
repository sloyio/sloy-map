import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { MapLoader } from "@/components/MapLoader";
import { FeatureCard } from "./FeatureCard";
import { useCard } from "@/state/useCard";
import { ISource } from "@/types";

export function RenderJsonCard({ source }: { source: ISource }) {
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

  // cardId can be 0
  if (typeof cardId !== "string" && typeof cardId !== "number") {
    return null;
  }

  if (!card) {
    return null;
  }

  return (
    <FeatureCard data={data} featureId={cardId} card={card} source={source} />
  );
}
