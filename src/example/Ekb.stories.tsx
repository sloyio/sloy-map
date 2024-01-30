import { Provider } from "react-redux";
import { defaultTheme } from "sloy-ui";
import { configureStore } from "@reduxjs/toolkit";
import { sloyReducer } from "@/state/slice";
import { SloyMap } from "@/SloyMap";
import { defaultLayers, defaultMapState, defaultSources } from "./ekbConfig";

import "sloy-ui/fonts.css";

// @ts-expect-error
window.SLOY_SHOW_INTERNAL_DATA = true;

export default {
  title: "Map/Ekb",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};

function AppMap() {
  return (
    <SloyMap
      theme={defaultTheme}
      locale="ru-RU"
      mapState={defaultMapState}
      sources={defaultSources}
      layers={defaultLayers}
    />
  );
}

const store = configureStore({
  reducer: {
    sloy: sloyReducer,
  },
});

const Template = () => {
  return (
    <Provider store={store}>
      <AppMap />
    </Provider>
  );
};

export const Default = Template.bind({});
