import { SloyLogo } from "@/components/SloyLogo";
import { Provider } from "react-redux";
// import { Button, ButtonSize, ButtonType } from "sloy-ui";
import styled from "styled-components";
import { configureStore } from "@reduxjs/toolkit";
import { SloyMap, sloyReducer } from "@/index";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./gorodetsConfig";
import sloyLoader from "./sloy-loader.svg";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: scale(1.4);
  margin: 8px;
`;

export default {
  title: "Map/Gorodets",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};

const store = configureStore({
  reducer: {
    sloy: sloyReducer,
  },
});

const Example = () => (
  <Provider store={store}>
    <SloyMap
      locale="ru-RU"
      mapState={defaultMapState}
      sources={defaultSources}
      layers={defaultLayers}
      mapProps={{ hash: true }}
      copyrights={copyrights}
      layout={{
        hasBaseMap: true,
        hasPmtiles: true,
        loaderImageSrc: sloyLoader,
      }}
      renderFooter={() => (
        <>
          <LogoWrapper>
            <SloyLogo />
          </LogoWrapper>
          {/* <>
            <Button
              type={ButtonType.DEFAULT}
              size={ButtonSize.MEDIUM}
              href="https://github.com/sloyio/sloy-map"
              rounded
            >
              Github
            </Button>
            <Button
              type={ButtonType.DEFAULT}
              size={ButtonSize.MEDIUM}
              href="https://sloyio.notion.site/Sloy-98aa2acd3d7249299f7d2422aa3dd0d9"
              rounded
            >
              {t("About")}
            </Button>
          </> */}
        </>
      )}
    />
  </Provider>
);

export const Default = Example.bind({});
