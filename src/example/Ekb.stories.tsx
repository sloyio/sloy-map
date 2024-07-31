/** eslint-disable prettier/prettier */
/** eslint-disable @typescript-eslint/no-unused-vars */
import { SloyLogo } from "@/components/SloyLogo";
import { StoryObj } from "@storybook/react";
import { ComponentProps, useCallback } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
// import { Button, ButtonSize, ButtonType, defaultTheme } from "sloy-ui";
import {
  ILayer,
  OverrideLayersFn,
  SloyMap,
  internalTranslations,
  sloyReducer,
} from "@/index";
import { configureStore } from "@reduxjs/toolkit";
import "sloy-ui/fonts.css";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./ekbConfig";
import sloyLoader from "./sloy-loader.svg";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: scale(1.4);
  margin: 8px;
`;

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        // theme={defaultTheme}
        translations={internalTranslations}
        mapState={defaultMapState}
        sources={defaultSources}
        layers={defaultLayers}
        overrideLayers={overrideLayers}
        copyrights={copyrights}
        {...args}
        layout={{ loaderImageSrc: sloyLoader, ...args.layout }}
        renderFooter={() => (
          <>
            <LogoWrapper>
              <SloyLogo />
            </LogoWrapper>
            {/* <Button
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
          </Button> */}
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
  padding: 8px;
  &:first-child {
    padding-top: 0;
  }
  p {
    margin: 0;
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
