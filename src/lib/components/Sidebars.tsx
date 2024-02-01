import { Suspense, lazy } from "react";
import { SheetModal, LeftSidebar, RightSidebar, SidebarContent } from "sloy-ui";
import { useIsDesktop } from "@/helpers/isDesktop";
import { useCard } from "@/state/useCard";

const LazeCard = lazy(() => import("@/sources/Card"));
const LazeLayers = lazy(() => import("@/layers/Layers"));

function SidebarCard() {
  const isDesktop = useIsDesktop();
  const { closeCard, isCardActive } = useCard();

  const card = <LazeCard />;

  if (isDesktop && isCardActive) {
    return (
      <RightSidebar>
        <SidebarContent onClose={closeCard}>{card}</SidebarContent>
      </RightSidebar>
    );
  }

  return (
    <SheetModal isOpen={isCardActive} onClose={closeCard} snapPoints={[0.7]}>
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
