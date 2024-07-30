import { StoryObj } from "@storybook/react";
import { ComponentProps, useCallback } from "react";
import { Provider } from "react-redux";
import { Button, ButtonSize, ButtonType, defaultTheme } from "sloy-ui";
import { configureStore } from "@reduxjs/toolkit";
import {
  ILayer,
  OverrideLayersFn,
  SloyMap,
  internalTranslations,
  sloyReducer,
} from "@/index";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./ekbConfig";
import ekbLoader from "./ekb-loader.svg";
import "sloy-ui/fonts.css";
import styled from "styled-components";

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

const Example = (args: Partial<ComponentProps<typeof SloyMap>>) => {
  const overrideLayers: OverrideLayersFn = useCallback((layer: ILayer) => {
    switch (layer.id) {
      case "ekb-quarter":
        return <QuarterFilter />;
      case "ekb-facades":
        return <FacadeFilter />;
      default:
        return null;
    }
  }, []);

  return (
    <Provider store={store}>
      <SloyMap
        locale="ru-RU"
        theme={defaultTheme}
        translations={internalTranslations}
        mapState={defaultMapState}
        sources={defaultSources}
        layers={defaultLayers}
        overrideLayers={overrideLayers}
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
};

// internal stories code, do not copy:
type Story = StoryObj<typeof SloyMap>;
export const Default: Story = Example.bind({});
// Default.args = { mapProps: { reuseMaps: false } };

const FacadeWrapper = styled.div`
  font-size: 14px;
  line-height: 21px;

  p {
    margin: 8px;
    &:first-child {
      margin-top: 0;
    }
  }
`;

function FacadeFilter() {
  return (
    <FacadeWrapper>
      <p>
        Для зданий в&nbsp;первом поясе туристического центра Екатеринбурга
        разработан специальный дизайн-код фасадов. Это нужно для того, чтобы
        историческая часть города имела опрятное и&nbsp;единое оформление.
        В&nbsp;этом слое показаны дома, которые входят в&nbsp;первый пояс. Чтобы
        посмотреть регламент оформления фасада, кликните на&nbsp;дом,
        а&nbsp;затем на&nbsp;зелёную кнопку скачивания.
      </p>
    </FacadeWrapper>
  );
}

const QuarterWRapper = styled.div`
  font-size: 14px;
  line-height: 21px;

  p {
    margin: 8px;
    &:first-child {
      margin-top: 0;
    }
  }

  ul {
    list-style-type: "— ";
    margin: 0;
    padding: 0;
    padding-left: 16px;
  }

  li {
    padding: 0;
  }
`;

function QuarterFilter() {
  return (
    <QuarterWRapper>
      <p>
        Квартальный 🙋 — это человек, который следит за&nbsp;порядком на
        придомовых территориях, детских площадках, парковках, мусорках, объектах
        торговли и&nbsp;т. д.
      </p>
      <p>На что можно пожаловаться квартальному:</p>
      <ul>
        <li>общие вопросы благоустройства;</li>
        <li>незаконная торговля, парковки и постройки;</li>
        <li>вывески и незаконная реклама;</li>
        <li>самовольные ограничения;</li>
        <li>сломанные детские площадки.</li>
      </ul>
    </QuarterWRapper>
  );
}