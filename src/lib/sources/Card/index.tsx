import { useSelector } from "react-redux";
import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { cardsSelector, sourcesSelector } from "@/state/selectors";
import { BuildingCard } from "@/sources/Card/BuildingCard";
import { MapLoader } from "@/components/MapLoader";
import { FeatureCard } from "./FeatureCard";

interface Props {
  popupHash?: string | null;
  sourceIdValue: string | null;
}

export function RenderCard({ popupHash, sourceIdValue }: Props) {
  const sources = useSelector(sourcesSelector);
  const cards = useSelector(cardsSelector);

  const source = sources[String(sourceIdValue)];
  const card = cards[String(source?.card)];

  const { loading, data } = useLoadGeoJSON({
    ...source,
    path:
      source?.dataByIdPath?.replace("{DATA_BY_ID}", String(popupHash)) ||
      source?.path,
  });

  if (loading) {
    return <MapLoader />;
  }

  if (!data || !popupHash || !source) {
    return null;
  }

  if (source.id === "buildingTile") {
    return <BuildingCard />;
  }

  return (
    <FeatureCard
      data={data}
      featureId={popupHash}
      card={card}
      source={source}
    />
  );
}
