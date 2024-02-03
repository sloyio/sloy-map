import { useMemo } from "react";
import { FeatureCollection } from "geojson";
import { ICard, ISource } from "@/types";
import { BaseCard } from "./BaseCard";

interface Props {
  data: FeatureCollection<any>;
  featureId: string;
  card?: ICard;
  source: ISource;
}

export function FeatureCard({ data, featureId, card, source }: Props) {
  const feature = useMemo(
    () =>
      data?.features?.find((f, i) => {
        const byPid = String(f.properties?.id) === String(featureId);
        const byFid = String(f.id) === String(featureId);
        const byI = String(i) === String(featureId);

        return byPid || byFid || byI;
      }),
    [data?.features, featureId],
  );

  const properties = feature?.properties;

  const { lng, lat } = useMemo(() => {
    const firstLng = feature?.geometry?.coordinates[0];
    const firstLat = feature?.geometry?.coordinates[1];

    return {
      lng:
        firstLng?.[0]?.[0]?.[0] ||
        firstLng?.[0]?.[0] ||
        firstLng?.[0] ||
        firstLng,

      lat:
        firstLng?.[0]?.[0]?.[1] ||
        firstLng?.[0]?.[1] ||
        firstLng?.[1] ||
        firstLat,
    };
  }, [feature?.geometry?.coordinates]);

  return (
    <BaseCard
      source={source}
      values={properties as Record<string, unknown>}
      card={card}
      lng={lng}
      lat={lat}
    />
  );
}
