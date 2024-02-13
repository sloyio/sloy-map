import { useMemo } from "react";
import { useAppSelector } from "@/state";
import styled from "styled-components";
import { useActiveItems } from "@/state/selectors";

const Wrapper = styled.div`
  position: fixed;
  top: 56px;
  right: 0;
  z-index: 1000;
  padding: 4px 0;
  border-radius: 0 4px 4px 0px;
  background-color: black;
  color: ${({ theme }) => theme.text.color.secondary};
  font-size: 10px;
  line-height: 1.5;
  opacity: 1;
  transform: scale(-1);
  writing-mode: vertical-lr;
  & > a {
    text-decoration: none;
    color: inherit;
  }

  & a:not(:first-child):before {
    content: " · ";
  }

  @media screen and (width >= 1150px) {
    & {
      top: auto;
      left: 50%;
      bottom: 0;
      right: auto;
      border-radius: 2px 2px 0 0;
      padding: 0 4px;
      transform: translateX(-50%);
      writing-mode: lr;
    }
  }
`;

export function Copyright() {
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);
  const copyrights = useAppSelector((state) => state.sloy.config.copyrights);
  const { activeCopyrightsIds } = useActiveItems();

  const attributions = useMemo(() => {
    const ids = Array.from(
      new Set(
        activeCopyrightsIds.concat(
          Object.values(copyrights || {})
            .filter((c) => c.requiredAttribution)
            .map((c) => c.id),
        ),
      ),
    );

    // only requiredAttribution
    // const ids = Array.from(
    //   new Set(
    //     Object.values(copyrights || {})
    //       .filter((c) => c.requiredAttribution)
    //       .map((c) => c.id),
    //   ),
    // );

    return ids.map((id) => copyrights[id]);
  }, [copyrights, activeCopyrightsIds]);

  if (!isAppLoaded) {
    return null;
  }

  return (
    <Wrapper>
      {attributions.map((c) => (
        <a key={c.url} href={c.url} target="_blank" rel="noreferrer">
          {c.shortName}
        </a>
      ))}
    </Wrapper>
  );
}
