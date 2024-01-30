import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { GlobalStyles, defaultTheme } from "sloy-ui";
import { configureStore } from "@reduxjs/toolkit";
import { sloyReducer } from "@/state/slice";
import { SloyMap } from "@/SloyMap";
import { defaultLayers, defaultMapState, defaultSources } from "./ekbConfig";

import "sloy-ui/fonts.css";

// @ts-expect-error
window.SLOY_DEV_JSON = true;

export default {
  title: "Map/Ekb",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};

function AppMap() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <SloyMap
        locale="ru-RU"
        mapState={defaultMapState}
        sources={defaultSources}
        layers={defaultLayers}
      />
    </ThemeProvider>
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
