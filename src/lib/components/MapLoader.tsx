import styled from "styled-components";
import { AnimatedLogo } from "sloy-ui";

const FilterLoaderContainer = styled.div`
  position: relative;
  height: 128px;
`;

export function MapLoader() {
  return (
    <FilterLoaderContainer>
      <AnimatedLogo radius="100px" />
    </FilterLoaderContainer>
  );
}
