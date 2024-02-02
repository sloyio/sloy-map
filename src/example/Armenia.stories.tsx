import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { sloyReducer } from "@/state/slice";
import { SloyMap } from "@/index";
import {
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./armeniaConfig";
import translations from "./armenia.locales.json";
import {
  BASEMAP_SOURCES,
  BESEMAP_TERRAIN_SOURCE,
  BASEMAP_LAYERS,
  BESEMAP_TERRAIN_LAYER,
} from "@/publicLayers/BasemapLayer";

// window.SLOY_SHOW_INTERNAL_DATA = true;

export default {
  title: "Map/Armenia",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};
function AppMap() {
  const sources = defaultSources
    .concat(BESEMAP_TERRAIN_SOURCE)
    .concat(BASEMAP_SOURCES);

  const layers = defaultLayers
    .concat(BASEMAP_LAYERS)
    .concat(BESEMAP_TERRAIN_LAYER);

  return (
    <SloyMap
      locale="ru-RU"
      mapState={defaultMapState}
      sources={sources}
      layers={layers}
      translations={translations}
      terrainSource={BESEMAP_TERRAIN_SOURCE.id}
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
