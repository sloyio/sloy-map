import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import {
  SloyMap,
  sloyReducer,
  BESEMAP_TERRAIN_SOURCE,
  internalTranslations,
  LanguageSwitcher,
} from "@/index";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./armeniaConfig";
import { Button, ButtonSize, ButtonType } from "sloy-ui";
import translations from "./armenia.locales.json";
import sloyLoader from "./sloy-loader.svg";

// @ts-ignore
// window.SLOY_SHOW_INTERNAL_DATA = true;

export default {
  title: "Map/Advanced/Armenia",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};

const store = configureStore({
  reducer: {
    sloy: sloyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createLogger({
        collapsed: true,
      }),
    ),
});

const Example = () => (
  <Provider store={store}>
    <SloyMap
      locale="en-EN"
      availableLocales={["en-EN", "am-AM", "ru-RU"]}
      mapState={defaultMapState}
      sources={defaultSources}
      layers={defaultLayers}
      translations={Object.assign({}, translations, internalTranslations)}
      terrainSource={BESEMAP_TERRAIN_SOURCE.id}
      mapProps={{ hash: true }}
      copyrights={copyrights}
      layout={{
        hasBaseMap: true,
        hasPmtiles: true,
        loaderImageSrc: sloyLoader,
      }}
      renderFooter={({ t }) => (
        <>
          <LanguageSwitcher />
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
        </>
      )}
    />
  </Provider>
);

export const Default = Example.bind({});
