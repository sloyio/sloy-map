import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { sloyReducer } from "@/state/slice";
import { SloyMap } from "@/SloyMap";
import { CENTER_COORDS, MAX_ZOOM, MIN_ZOOM } from "./constants";
import { state } from "./config";

import "sloy-ui/style.css";

export default {
  title: "App",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};

function AppMap() {
  return (
    <SloyMap
      locale="ru-RU"
      initialViewState={{
        latitude: CENTER_COORDS[1],
        longitude: CENTER_COORDS[0],
        zoom: 15,
        pitch: 0,
      }}
      mapStyle="https://map-backend.netlify.app/style.json"
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
    />
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
