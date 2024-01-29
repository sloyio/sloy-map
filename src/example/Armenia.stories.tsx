import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import {
  SloyMap,
  sloyReducer,
  BESEMAP_TERRAIN_SOURCE,
  internalTranslations,
} from "@/index";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./armeniaConfig";
import translations from "./armenia.locales.json";
import sloyLoader from "./sloy-loader.svg";

// window.SLOY_SHOW_INTERNAL_DATA = true;

export default {
  title: "Map/Advanced/Armenia",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};
function AppMap() {
  return (
    <SloyMap
      locale="en-EN"
      mapState={defaultMapState}
      sources={defaultSources}
      layers={defaultLayers}
      translations={Object.assign({}, translations, internalTranslations)}
      terrainSource={BESEMAP_TERRAIN_SOURCE.id}
      mapProps={{ hash: true }}
      copyrights={copyrights}
      layout={{
        hasBaseMap: true,
        loaderImageSrc: sloyLoader,
      }}
    />
  );
}

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

const Template = () => {
  return (
    <Provider store={store}>
      <AppMap />
    </Provider>
  );
};

export const Default = Template.bind({});
