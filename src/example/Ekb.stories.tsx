import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { GlobalStyles, defaultTheme } from "sloy-ui";
import { configureStore } from "@reduxjs/toolkit";
import { sloyReducer } from "@/state/slice";
import { SloyMap } from "@/SloyMap";
import { MAX_ZOOM, MIN_ZOOM } from "./constants";
import { state } from "./ekbConfig";

import "sloy-ui/style.css";
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
      <SloyMap {...state.mapState} minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} />
    </ThemeProvider>
  );
}

const store = configureStore({
  reducer: {
    sloy: sloyReducer,
  },
  preloadedState: {
    sloy: {
      activeLayer: null,
      activeFilterParams: null,
      appLoaded: false,
      config: state,
    },
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
