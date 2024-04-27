import styled from "styled-components";
import { SheetModal, LeftSidebar, RightSidebar, SidebarContent } from "sloy-ui";
import { useIsDesktop } from "@/helpers/mediaQueries";
import { useCard } from "@/state/useCard";
import { Layers } from "@/layers/Layers";
import { useRenderCard } from "@/sources/cards";
import { useAppSelector } from "@/state";

const Right = styled(RightSidebar)`
  & > div {
    display: flex;
  }
`;

function SidebarCard() {
  const isDesktop = useIsDesktop();
  const { closeCard, isCardActive } = useCard();

  const card = useRenderCard();

  if (!card) return null;

  if (isDesktop && isCardActive) {
    return (
      <Right>
        <SidebarContent onClose={closeCard}>{card}</SidebarContent>
      </Right>
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
  const layers = useAppSelector((state) => state.sloy.config.layers);

  const hasLayers = layers && Object.keys(layers).length;

  if (!hasLayers) {
    return null;
  }

  const content = <Layers />;

  if (isDesktop) {
    return <LeftSidebar>{content}</LeftSidebar>;
  }

  return (
    <SheetModal snapPoints={[0.6, 0.1]} isOpen>
      {content}
    </SheetModal>
  );
}

export const Sidebars = () => (
  <>
    <SidebarFilter />
    <SidebarCard />
  </>
);
