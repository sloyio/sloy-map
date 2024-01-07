import React from "react";
import { FeatureCollection } from "geojson";
import { ICard, ISource } from "@/types";
import { BaseCard } from "./BaseCard";

export function FeatureCard({
  data,
  featureId,
  card,
  source,
}: {
  data: FeatureCollection<any>;
  featureId: string;
  card?: ICard;
  source: ISource;
}) {
  const feature = data?.features?.find((f, i) => {
    const byPid = String(f.properties?.id) === featureId;
    const byFid = String(f.id) === featureId;
    const byI = String(i) === featureId;

    return byPid || byFid || byI;
  });

  const properties = feature?.properties;

  return (
    <BaseCard
      source={source}
      values={properties as Record<string, unknown>}
      card={card}
      coordinates={feature?.geometry?.coordinates}
    />
  );
}
