import { Provider } from "react-redux";
import { defaultTheme } from "sloy-ui";
import { configureStore } from "@reduxjs/toolkit";
import { SloyMap, internalTranslations, sloyReducer } from "@/index";
import { defaultLayers, defaultMapState, defaultSources } from "./ekbConfig";
import "sloy-ui/fonts.css";

// window.SLOY_SHOW_INTERNAL_DATA = true;

export default {
  title: "Map/Advanced/Ekb",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};

function AppMap() {
  return (
    <SloyMap
      locale="ru-RU"
      theme={defaultTheme}
      translations={internalTranslations}
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
