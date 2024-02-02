import { useDispatch } from "react-redux";
import { Accordion, AccordionItem } from "sloy-ui";
import { ILayer } from "@/types";
import { Layer } from "./Layer";
import { toggleLayers } from "@/state/slice";
import { useCallback, useState } from "react";
import { useMap } from "react-map-gl";
import { useAppSelector } from "@/state";
import { BaseMapLayer } from "./BaseMapLayer";

export function Layers() {
  const { sloyMapGl } = useMap();
  const dispatch = useDispatch();
  const layers = useAppSelector((state) => state.sloy.config.layers);
  const activeLayers = useAppSelector((state) => state.sloy.activeLayers);

  const toggleSingle = useCallback(
    (activeLayerId: string | null, isActive: boolean) => {
      if (activeLayerId) {
        if (isActive) {
          dispatch(toggleLayers([]));
        } else {
          dispatch(toggleLayers([activeLayerId]));
        }
      }
    },
    [dispatch],
  );

  const toggleMultiple = useCallback(
    (activeLayerId: string | null, isActive: boolean) => {
      if (activeLayerId) {
        if (isActive) {
          dispatch(
            toggleLayers(activeLayers.filter((id) => id !== activeLayerId)),
          );
        } else {
          dispatch(toggleLayers(activeLayers.concat(activeLayerId)));
        }
      }
    },
    [activeLayers, dispatch],
  );

  const onToggleClick = useCallback(
    (activeLayerId: string | null, isActive: boolean) => {
      const isMultiple = true;
      if (isMultiple) {
        toggleMultiple(activeLayerId, isActive);
      } else {
        toggleSingle(activeLayerId, isActive);
      }

      if (activeLayerId && layers[activeLayerId]) {
        const layer = layers[activeLayerId];
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
    [layers, sloyMapGl, toggleMultiple, toggleSingle],
  );

  const [isActive, setActive] = useState(false);

  return (
    <Accordion>
      <AccordionItem
        title="Базовая карта"
        isSelected={isActive}
        toggle={() => setActive(!isActive)}
      >
        <BaseMapLayer />
      </AccordionItem>

      {Object.values(layers).map((layer: ILayer) => {
        const isActive = activeLayers.includes(layer.id);
        const toggle = () => {
          onToggleClick(layer.id, isActive);
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
