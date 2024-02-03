import { useMemo } from "react";
import { ListGrid, ListGridItem, Checkbox } from "sloy-ui";
import { useMapContext, useSloyMap } from "@/helpers/useSloy";
import { useAppSelector } from "@/state";
import { useDispatch } from "react-redux";
import { updateBasemapLayer } from "..";

export function BaseMapLayer() {
  const map = useSloyMap();
  const dispatch = useDispatch();
  const { t } = useMapContext();
  const visualisationLayersIds = useAppSelector((state) =>
    Object.keys(state.sloy.config.visualisationLayers),
  );

  const mapLayers = useAppSelector((state) => state.sloy.basemap.mapLayers);
  const layers = useMemo(
    () => mapLayers.filter(({ id }) => !visualisationLayersIds.includes(id)),
    [mapLayers, visualisationLayersIds],
  );

  const items = useMemo(
    () =>
      layers.map(({ id, active }, i) => {
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
    [layers, t, dispatch, map],
  );

  return <ListGrid>{items}</ListGrid>;
}
