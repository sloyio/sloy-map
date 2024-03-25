import styled, { css } from "styled-components";
import { useIsDesktop } from "@/helpers/mediaQueries";
import { ReactNode, useMemo } from "react";
import { useMapContext } from "..";
import { IMapContext } from "@/state/context";

const Wrapper = styled.footer<{ $isDesktop?: boolean }>`
  position: fixed;
  display: flex;
  gap: 4px;
  ${({ $isDesktop }) =>
    $isDesktop
      ? css`
          bottom: 8px;
          left: 8px;
        `
      : css`
          top: 8px;
          left: 8px;
        `};
`;

export type RenderFooter = (props: { t: IMapContext["t"] }) => ReactNode;

export function Footer({ renderFooter }: { renderFooter?: RenderFooter }) {
  const isDesktop = useIsDesktop();
  const { t } = useMapContext();

  const footer = useMemo(() => renderFooter?.({ t }), [renderFooter, t]);

  return <Wrapper $isDesktop={isDesktop}>{footer}</Wrapper>;
}
