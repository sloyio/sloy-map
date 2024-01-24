import { useLoadGeoJSON } from "@/helpers/useLoadGeoJSON";
import { useAppSelector } from "@/state";
import { ISource } from "@/types";
import { Source } from "react-map-gl";

export function SourceItem(source: ISource) {
  const { loading, data } = useLoadGeoJSON(source);

  if (!loading) {
    return null;
  }

  return <Source id={source.id} type="geojson" data={data} generateId />;
}

export function Sources() {
  const sources = useAppSelector((state) => state.sloy.config.sources);

  return (
    <>
      {Object.values(sources).map((source) => (
        <SourceItem key={source.id} {...source} />
      ))}
    </>
  );
}
