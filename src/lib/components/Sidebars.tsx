import { Suspense, lazy, useContext } from "react";
import { SheetModal, LeftSidebar, RightSidebar, SidebarContent } from "sloy-ui";
import { useIsDesktop } from "@/helpers/isDesktop";
import { MapContext } from "@/state/MapProvider";

const LazeCard = lazy(() => import("@/sources/Card"));
const LazeLayers = lazy(() => import("@/layers/Layers"));

function SidebarCard() {
  const isDesktop = useIsDesktop();
  const popupProps = useContext(MapContext);
  const card = (
    <LazeCard
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
        <LazeLayers />
      </LeftSidebar>
    );
  }

  return (
    <SheetModal snapPoints={[0.6, 0.1]} isOpen>
      <LazeLayers />
    </SheetModal>
  );
}

export function Sidebars() {
  return (
    <Suspense fallback={null}>
      <SidebarFilter />
      <SidebarCard />
    </Suspense>
  );
}
