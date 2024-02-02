import { SheetModal, LeftSidebar, RightSidebar, SidebarContent } from "sloy-ui";
import { useIsDesktop } from "@/helpers/isDesktop";
import { useCard } from "@/state/useCard";
import { Layers } from "@/layers/Layers";
import { RenderCard } from "@/sources/Card";

function SidebarCard() {
  const isDesktop = useIsDesktop();
  const { closeCard, isCardActive } = useCard();

  const card = <RenderCard />;

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
  const layers = <Layers />;

  if (isDesktop) {
    return <LeftSidebar>{layers}</LeftSidebar>;
  }

  return (
    <SheetModal snapPoints={[0.6, 0.1]} isOpen>
      {layers}
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
