import { StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Provider } from "react-redux";
import { defaultTheme } from "sloy-ui";
import { configureStore } from "@reduxjs/toolkit";
import { SloyMap, internalTranslations, sloyReducer } from "@/index";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./ekbConfig";
import "sloy-ui/fonts.css";

// window.SLOY_SHOW_INTERNAL_DATA = true;

export default {
  title: "Map/Advanced/Ekb",
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

const Template = (args: Partial<ComponentProps<typeof SloyMap>>) => {
  return (
    <Provider store={store}>
      <SloyMap
        locale="ru-RU"
        theme={defaultTheme}
        translations={internalTranslations}
        mapState={defaultMapState}
        sources={defaultSources}
        layers={defaultLayers}
        copyrights={copyrights}
        {...args}
      />
    </Provider>
  );
};

// internal stories code, do not copy:
type Story = StoryObj<typeof SloyMap>;
export const Default: Story = Template.bind({});
Default.args = { mapProps: { reuseMaps: false } };
