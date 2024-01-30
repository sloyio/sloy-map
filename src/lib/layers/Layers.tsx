import { useDispatch } from "react-redux";
import { Accordion, AccordionItem } from "sloy-ui";
import { ILayer } from "@/types";
import { Layer } from "./Layer";
import { toggleLayer } from "@/state/slice";
import { useCallback } from "react";
import { useMap } from "react-map-gl";
import { useAppSelector } from "@/state";

export default function Layers() {
  const { sloyMapGl } = useMap();
  const dispatch = useDispatch();
  const layers = useAppSelector((state) => state.sloy.config.layers);
  const activeLayer = useAppSelector((state) => state.sloy.activeLayer);

  const onToggleClick = useCallback(
    (type: string | null) => {
      dispatch(toggleLayer(type));

      if (type && layers[type]) {
        const layer = layers[type];
        if (layer.initialViewState) {
          const map = sloyMapGl?.getMap();
          if (map) {
            map.flyTo({
              speed: 2,
              curve: 1,
              ...layer.initialViewState,
            });
          }
        }
      }
    },
    [dispatch, layers, sloyMapGl],
  );

  return (
    <Accordion>
      {Object.values(layers).map((layer: ILayer) => {
        const isActive = layer.id === activeLayer;
        const toggle = () => {
          if (isActive) {
            onToggleClick(null);
          } else {
            onToggleClick(layer.id);
          }
        };

        return (
          <AccordionItem
            key={layer.id}
            title={layer.title}
            subTitle={layer.subTitle}
            isSelected={isActive}
            toggle={toggle}
          >
            {isActive && <Layer layer={layer} />}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
