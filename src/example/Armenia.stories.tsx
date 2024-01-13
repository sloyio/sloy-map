import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { sloyReducer } from "@/state/slice";
import { SloyMap } from "@/SloyMap";
import { MAX_ZOOM, MIN_ZOOM } from "./constants";
import { state } from "./armeniaConfig";

import "sloy-ui/style.css";

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
  return <SloyMap {...state.mapState} minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} />;
}

const store = configureStore({
  reducer: {
    sloy: sloyReducer,
  },
  preloadedState: {
    sloy: {
      activeLayer: null,
      // activeLayer: "ekbHouseLevels",
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
