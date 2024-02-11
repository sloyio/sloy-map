import { MapContext } from "@/state/context";
import { ILayer } from "@/types";
import { useContext } from "react";

export function LayerUpdatedAt({
  updatedAt,
}: {
  updatedAt: ILayer["updatedAt"];
}) {
  const { locale } = useContext(MapContext);

  if (!updatedAt) return null;

  try {
    const dateString = new Intl.DateTimeFormat(locale.baseName).format(
      new Date(updatedAt),
    );

    return <span>{dateString}</span>;
  } catch (e) {
    return null;
  }
}
