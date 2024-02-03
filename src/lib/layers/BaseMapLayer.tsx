import { useMemo } from "react";
import { useList } from "@uidotdev/usehooks";
import { ListGrid, ListGridItem, Checkbox } from "sloy-ui";
import { useMapContext, useSloyMap } from "@/helpers/useSloy";
import { useAppSelector } from "@/state";

type BaseMapLayer = { id: string; isSelected: boolean };

export function BaseMapLayer() {
  const map = useSloyMap();
  const { t } = useMapContext();
  const visualisationLayersIds = useAppSelector((state) =>
    Object.keys(state.sloy.config.visualisationLayers),
  );
  const mapLayers = useMemo(() => map?.getStyle()?.layers || [], [map]);
  const layers = useMemo(
    () =>
      mapLayers
        .filter(({ id }: BaseMapLayer) => !visualisationLayersIds.includes(id))
        .map(({ id }: BaseMapLayer) => ({
          id,
          isSelected: Boolean(map?.getStyle(id)),
        })),
    [map, mapLayers, visualisationLayersIds],
  );

  const mapLayers = useAppSelector((state) => state.sloy.basemap.mapLayers);
  const layers = useMemo(
    () => mapLayers.filter(({ id }) => !visualizationsIds.includes(id)),
    [mapLayers, visualizationsIds],
  );

  const items = useMemo(
    () =>
      list.map(({ id, isSelected }, i) => {
        const toggle = () => {
          const newActiveValue = !active;

          map?.setLayoutProperty(
            id,
            "visibility",
            newActiveValue ? "visible" : "none",
          );

          dispatch(
            updateBasemapLayer({
              at: i,
              value: { id, active: newActiveValue },
            }),
          );
        };

        return (
          <ListGridItem
            key={id}
            prefix={<Checkbox isSelected={active} toggle={toggle} />}
          >
            {t(id)}
          </ListGridItem>
        );
      }),
    [list, map, t, updateAt],
  );

  return <ListGrid>{items}</ListGrid>;
}
