import { AnimatedLogo } from "sloy-ui";
import styled from "styled-components";

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
