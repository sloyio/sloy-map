import { useMemo } from "react";
import { ListGrid, ListGridItem, Checkbox } from "sloy-ui";
import { useSloyMap } from "@/helpers/useSloy";
import { useList } from "@uidotdev/usehooks";

type BaseMapLayer = { id: string; isSelected: boolean };

export function BaseMapLayer() {
  const map = useSloyMap();
  const mapLayers = useMemo(() => map?.getStyle()?.layers || [], [map]);
  const layers = useMemo(
    () =>
      mapLayers.map(({ id }: BaseMapLayer) => ({
        id,
        isSelected: Boolean(map?.getStyle(id)),
      })),
    [map, mapLayers],
  );

  const [list, { updateAt }] = useList<BaseMapLayer>(layers);

  return (
    <ListGrid>
      {list.map(({ id, isSelected }, i) => {
        const toggle = () => {
          updateAt(i, { id, isSelected: !isSelected });

          map?.setLayoutProperty(
            id,
            "visibility",
            isSelected ? "none" : "visible",
          );
        };

        return (
          <ListGridItem
            key={id}
            prefix={<Checkbox isSelected={isSelected} toggle={toggle} />}
          >
            {id}
          </ListGridItem>
        );
      })}
    </ListGrid>
  );
}
