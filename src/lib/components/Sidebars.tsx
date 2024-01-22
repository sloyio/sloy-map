import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SheetModal, LeftSidebar, RightSidebar, SidebarContent } from "sloy-ui";
import { toggleData } from "@/state/slice";
import { activeLayerSelector, layersSelector } from "@/state/selectors";
import { useIsDesktop } from "@/helpers/isDesktop";
import { RenderCard } from "@/sources/Card";
import { MapContext } from "@/state/MapProvider";
import { Layers } from "@/components/Layers";
import { useMap } from "react-map-gl";

function SidebarCard() {
  const isDesktop = useIsDesktop();
  const popupProps = useContext(MapContext);
  const card = (
    <RenderCard
      popupHash={popupProps.popupHash}
      sourceIdValue={popupProps.sourceIdValue}
    />
  );

  if (isDesktop && popupProps.popupHash) {
    return (
      <RightSidebar>
        <SidebarContent onClose={popupProps.closePopup}>{card}</SidebarContent>
      </RightSidebar>
    );
  }

  return (
    <SheetModal
      isOpen={Boolean(popupProps.popupHash)}
      onClose={popupProps.closePopup}
      snapPoints={[0.7]}
    >
      {card}
    </SheetModal>
  );
}

function SidebarFilter() {
  const isDesktop = useIsDesktop();
  const dispatch = useDispatch();
  const activeLayer = useSelector(activeLayerSelector);
  const layers = useSelector(layersSelector);
  const { sloyMapGl } = useMap();
  const onToggleClick = useCallback(
    (type: string) => {
      dispatch(toggleData({ type }));

      if (layers[type]) {
        const layer = layers[type];
        if (layer.initialViewState) {
          const map = sloyMapGl?.getMap();
          if (map) {
            map.flyTo({
              speed: 2.5,
              ...layer.initialViewState,
            });
          }
        }
      }
    },
    [dispatch, layers, sloyMapGl],
  );

  const filter = (
    <Layers activeLayer={activeLayer} onToggleClick={onToggleClick} />
  );

  if (isDesktop) {
    return <LeftSidebar>{filter}</LeftSidebar>;
  }

  return (
    <SheetModal snapPoints={[0.6, 0.1]} isOpen>
      {filter}
    </SheetModal>
  );
}

export function Sidebars() {
  return (
    <>
      <SidebarFilter />
      <SidebarCard />
    </>
  );
}
