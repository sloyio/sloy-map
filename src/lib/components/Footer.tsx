import styled, { css } from "styled-components";
import { useIsDesktop } from "@/helpers/mediaQueries";
import { ReactNode, useMemo } from "react";
import { useMapContext } from "..";
import { IMapContext } from "@/state/context";

const Wrapper = styled.footer<{ $isDesktop?: boolean }>`
  position: fixed;
  display: flex;
  gap: 8px;
  ${({ $isDesktop }) =>
    $isDesktop
      ? css`
          bottom: 12px;
          left: 12px;
        `
      : css`
          top: 12px;
          left: 12px;
        `};
`;

export type RenderFooter = (props: { t: IMapContext["t"] }) => ReactNode;

export function Footer({ renderFooter }: { renderFooter?: RenderFooter }) {
  const isDesktop = useIsDesktop();
  const { t } = useMapContext();

  const footer = useMemo(() => renderFooter?.({ t }), [renderFooter, t]);

  return <Wrapper $isDesktop={isDesktop}>{footer}</Wrapper>;
}
