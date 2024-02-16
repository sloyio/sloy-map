import { StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Provider } from "react-redux";
import { Button, ButtonSize, ButtonType, defaultTheme } from "sloy-ui";
import { configureStore } from "@reduxjs/toolkit";
import { SloyMap, internalTranslations, sloyReducer } from "@/index";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./ekbConfig";
import ekbLoader from "./ekb-loader.svg";
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

const Example = (args: Partial<ComponentProps<typeof SloyMap>>) => (
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
      layout={{ loaderImageSrc: ekbLoader, ...args.layout }}
      renderFooter={({ t }) => (
        <>
          <Button
            type={ButtonType.DEFAULT}
            size={ButtonSize.MEDIUM}
            href="https://github.com/gcor/sloy-map"
            rounded
          >
            Github
          </Button>
          <Button
            type={ButtonType.DEFAULT}
            size={ButtonSize.MEDIUM}
            href="https://github.com/gcor/sloy-map"
            rounded
          >
            {t("About")}
          </Button>
        </>
      )}
    />
  </Provider>
);

// internal stories code, do not copy:
type Story = StoryObj<typeof SloyMap>;
export const Default: Story = Example.bind({});
// Default.args = { mapProps: { reuseMaps: false } };
