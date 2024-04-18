import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SloyMap, sloyReducer } from "@/index";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./gorodetsConfig";
import sloyLoader from "./sloy-loader.svg";

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
      locale="en-EN"
      availableLocales={["en-EN", "am-AM", "ru-RU"]}
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
    />
  </Provider>
);

export const Default = Example.bind({});
