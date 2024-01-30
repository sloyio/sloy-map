import { ThemeProvider } from "styled-components";
import { GlobalStyles, sloyTheme } from "sloy-ui";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { sloyReducer } from "@/state/slice";
import { SloyMap } from "@/SloyMap";
import {
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./armeniaConfig";
import translations from "./armenia.locales.json";

// @ts-expect-error
window.SLOY_DEV_JSON = true;

export default {
  title: "Map/Armenia",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};
function AppMap() {
  return (
    <ThemeProvider theme={sloyTheme}>
      <GlobalStyles />
      <SloyMap
        mapState={defaultMapState}
        sources={defaultSources}
        layers={defaultLayers}
        locale="ru-RU"
        translations={translations}
      />
    </ThemeProvider>
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
