import styled from "styled-components";
import { MapLoader } from "./MapLoader";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  margin: auto;
  display: flex;
`;

export function PageLoader() {
  return (
    <Wrapper>
      <MapLoader />
    </Wrapper>
  );
}
