import { SloyLogo } from "@/components/SloyLogo";
import {
  BESEMAP_TERRAIN_SOURCE,
  LanguageSwitcher,
  SloyMap,
  internalTranslations,
  sloyReducer,
} from "@/index";
import { configureStore } from "@reduxjs/toolkit";
import { useMemo, useState } from "react";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import {
  Button,
  ButtonSize,
  ButtonType,
  Dropdown,
  Icon,
  IconType,
} from "sloy-ui";
import styled from "styled-components";
import translations from "./armenia.locales.json";
import {
  copyrights,
  defaultLayers,
  defaultMapState,
  defaultSources,
} from "./armeniaConfig";
import sloyLoader from "./sloy-loader.svg";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: scale(1.4);
  margin: 0 8px;
`;

export default {
  title: "Map/Advanced/Armenia",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};

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

const sections = [
  {
    label: "Армения",
    items: [
      { label: "Вся страна", id: "whole_country" },
      { label: "Ереван", id: "erevan" },
    ],
  },
  {
    label: "Россия",
    items: [
      { label: "Екатеринбург", id: "ekaterinburg" },
      { label: "Челябинск", id: "chelyabinsk" },
    ],
  },
];

const DropdownWrapper = styled.div`
  * {
    z-index: 999 !important;
  }
`;

const Example = () => {
  const [city, setCity] = useState<string>("ekaterinburg");

  const cityName = useMemo(() => {
    return sections
      .map((elem) => elem.items)
      .flat()
      .find((elem) => elem.id === city)?.label;
  }, [city]);

  function onClick(city: string) {
    setCity(city);
  }

  return (
    <Provider store={store}>
      <SloyMap
        locale="en-EN"
        availableLocales={["en-EN", "am-AM", "ru-RU"]}
        mapState={defaultMapState}
        sources={defaultSources}
        layers={defaultLayers}
        translations={Object.assign({}, translations, internalTranslations)}
        terrainSource={BESEMAP_TERRAIN_SOURCE.id}
        mapProps={{ hash: true }}
        copyrights={copyrights}
        layout={{
          hasBaseMap: true,
          hasPmtiles: true,
          loaderImageSrc: sloyLoader,
        }}
        renderFooter={({ t }) => (
          <>
            <LogoWrapper>
              <SloyLogo />
            </LogoWrapper>
            <>
              <DropdownWrapper>
                <Dropdown placement="top-start">
                  <Dropdown.Trigger>
                    <Button
                      type={ButtonType.DEFAULT}
                      size={ButtonSize.MEDIUM}
                      prefix={<Icon type={IconType.Earth} />}
                      rounded
                    >
                      {cityName}
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Menu>
                    {sections.map((group) => (
                      <Dropdown.MenuGroup title={group.label}>
                        {group.items.map((item) => (
                          <Dropdown.MenuItem
                            onClick={() => onClick(item.id)}
                            isActive={item.id === city}
                          >
                            {item.label}
                          </Dropdown.MenuItem>
                        ))}
                      </Dropdown.MenuGroup>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </DropdownWrapper>
              <LanguageSwitcher />
              <Button
                type={ButtonType.DEFAULT}
                size={ButtonSize.MEDIUM}
                href="https://github.com/sloyio/sloy-map"
                rounded
              >
                Github
              </Button>
              <Button
                type={ButtonType.DEFAULT}
                size={ButtonSize.MEDIUM}
                href="https://sloyio.notion.site/Sloy-98aa2acd3d7249299f7d2422aa3dd0d9"
                rounded
              >
                {t("About")}
              </Button>
            </>
          </>
        )}
      />
    </Provider>
  );
};

export const Default = Example.bind({});
