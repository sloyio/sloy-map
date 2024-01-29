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
  const { loaderImageSrc } = useContext(MapContext);

  if (loaderImageSrc) {
    return (
      <FilterLoaderContainer>
        <img src={loaderImageSrc} alt="loading" />
      </FilterLoaderContainer>
    );
  }

  return (
    <FilterLoaderContainer>
      <AnimatedLogo radius="100px" />
    </FilterLoaderContainer>
  );
}
