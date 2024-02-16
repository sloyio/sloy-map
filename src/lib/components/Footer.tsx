import styled, { css } from "styled-components";
import { useIsDesktop } from "@/helpers/mediaQueries";
import { LanguageSwitcher } from "./LanguageSwitcher";
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

export function Footer({
  renderFooter,
}: {
  renderFooter?: (context: IMapContext) => ReactNode;
}) {
  const isDesktop = useIsDesktop();
  const context = useMapContext();
  const footer = useMemo(
    () => renderFooter?.(context),
    [context, renderFooter],
  );

  return (
    <Wrapper $isDesktop={isDesktop}>
      <LanguageSwitcher />
      {footer}
    </Wrapper>
  );
}
