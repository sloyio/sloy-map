import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SheetModal } from "sloy-ui";
import { toggleData } from "@/state/slice";
import { activeLayerSelector, layersSelector } from "@/state/selectors";
import { useIsDesktop } from "@/helpers/isDesktop";
import { RenderCard } from "@/sources/Card";
import { DesktopCard } from "@/components/DesktopCard";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
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

  if (isDesktop) {
    return (
      <RightSidebar>
        <DesktopCard closePopup={popupProps.closePopup}>{card}</DesktopCard>
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
        if (typeof layer.defaultZoom === "number") {
          const map = sloyMapGl?.getMap();
          if (map) {
            map.flyTo({
              speed: 2.5,
              zoom: layer.defaultZoom,
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
