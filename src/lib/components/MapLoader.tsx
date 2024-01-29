import { useContext } from "react";
import { AnimatedLogo } from "sloy-ui";
import styled from "styled-components";
import { MapContext } from "@/state/MapProvider";

const FilterLoaderContainer = styled.div`
  position: relative;
  height: 128px;
  margin: auto;

  img {
    width: 100%;
    height: 100%;
  }
`;

export function MapLoader() {
  const { layout } = useContext(MapContext);

  if (layout.loaderImageSrc) {
    return (
      <FilterLoaderContainer>
        <img src={layout.loaderImageSrc} alt="loading" />
      </FilterLoaderContainer>
    );
  }

  return (
    <FilterLoaderContainer>
      <AnimatedLogo radius="100px" />
    </FilterLoaderContainer>
  );
}
