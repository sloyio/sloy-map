import { useContext } from "react";
import { SheetModal, LeftSidebar, RightSidebar, SidebarContent } from "sloy-ui";
import { useIsDesktop } from "@/helpers/isDesktop";
import { RenderCard } from "@/sources/Card";
import { MapContext } from "@/state/MapProvider";
import { Layers } from "@/layers/Layers";

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

  if (isDesktop) {
    return (
      <LeftSidebar>
        <Layers />
      </LeftSidebar>
    );
  }

  return (
    <SheetModal snapPoints={[0.6, 0.1]} isOpen>
      <Layers />
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
