import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SloyMap, internalTranslations, sloyReducer } from "@/index";

/** Example: */
const store = configureStore({
  reducer: {
    sloy: sloyReducer,
  },
});

const CITY_VIEW = {
  center: [44.51, 40.18001],
  zoom: 14.5,
  pitch: 0,
  bearing: 0,
};

const COUNTRY_VIEW = {
  center: [44.5106, 40.3],
  zoom: 8,
  pitch: 0,
  bearing: 0,
};

const App = () => (
  <Provider store={store}>
    <SloyMap
      // Unicode locale (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/Locale)
      locale="en-EN"
      mapState={{
        initialViewState: {
          ...CITY_VIEW,
          longitude: CITY_VIEW.center[0],
          latitude: CITY_VIEW.center[1],
        },
        mapStyle: "/sloy-dark-map-style.json",
        minZoom: 7,
        maxZoom: 20,
      }}
      mapProps={
        {
          // uncomment if you use mapbox:
          // mapboxAccessToken: 'xxxxx'
        }
      }
      sources={[
        {
          id: "osmBuilding",
          copyright: [],
          type: "map-source",
          card: {
            title: ["addr:street", "addr:housenumber"],
            blocks: [
              { type: "value", id: "name:en" },
              { type: "value", id: "building:levels" },
            ],
          },
          properties: [
            {
              title: "Name",
              id: "name:en",
            },
            {
              title: "Building levels",
              id: "building:levels",
              range: [
                { from: 1, to: 3, color: "#006adb", value: 11656 },
                { from: 3, to: 5, color: "#0084e2", value: 3172 },
                { from: 5, to: 9, color: "#009ee1", value: 3380 },
                { from: 9, to: 12, color: "#00b7d9", value: 1929 },
                { from: 12, to: 16, color: "#00cfc5", value: 664 },
                { from: 16, to: 21, color: "#00e7a3", value: 320 },
                { from: 21, to: 25, color: "#72f674", value: 8 },
                { from: 25, to: 31, color: "#c0fc49", value: 0 },
                { from: 31, to: 52, color: "#ffea00", value: 0 },
              ],
            },
          ],
        },
        {
          id: "armenianRadiationBalanceLayerSource",
          path: "/radiation_bal.json",
          type: "geojson",
          projection: "EPSG:28408",
          card: {
            blocks: [
              {
                type: "value",
                id: "VALUE",
              },
            ],
          },
          properties: [
            {
              id: "VALUE",
              title: "kcal/cm²",
              values: {
                40: { color: "#fddede" },
                45: { color: "#feb7b9" },
                50: { color: "#fd9793" },
                55: { color: "#fd906c" },
                60: { color: "#f57a4e" },
                65: { color: "#e75338" },
                70: { color: "#cf2b1c" },
              },
            },
            {
              id: "UNIT",
              title: "Units",
            },
          ],
          copyright: [],
        },
      ]}
      layers={[
        {
          title: "Number of floors (osm)",
          subTitle: "20",
          description:
            "The number of floors of buildings in Armenia, the data on which is available in Openstreetmap.",
          initialViewState: CITY_VIEW,
          filters: [
            {
              type: "range",
              filterVisualizations: ["houseLevelsLayer"],
              source: "osmBuilding",
              property: "building:levels",
            },
          ],
          visualizations: [
            {
              id: "houseLevelsLayer",
              type: "building-range",
              source: "osmBuilding",
              property: "building:levels",
              openable: true,
            },
          ],
        },
        {
          title: "Geojson example",
          description: "Description",
          updatedAt: "2017-08-16T19:00:00.000Z",
          initialViewState: COUNTRY_VIEW,
          link: {
            href: "https://data.opendata.am/dataset/sustc-477",
            label: "Source",
          },
          filters: [
            {
              property: "VALUE",
              type: "string",
              filterVisualizations: ["armenianRadiationBalanceLayer"],
              source: "armenianRadiationBalanceLayerSource",
            },
          ],
          visualizations: [
            {
              id: "armenianRadiationBalanceLayer",
              source: "armenianRadiationBalanceLayerSource",
              openable: true,
              property: "VALUE",
              type: "map",
              mapLayerProps: {
                type: "fill",
                paint: {
                  "fill-opacity": 0.6,
                },
              },
            },
          ],
        },
      ]}
      translations={{ ...internalTranslations, ...translations }}
    />
  </Provider>
);

const translations = {
  "Building levels": {
    am: "Շենքի մակարդակները",
    en: "Building levels",
  },
  Description: {
    am: "Նկարագրություն",
    en: "Description",
  },
  "Geojson example": {
    am: "GeoJSON-Ի Օրինակ",
    en: "Geojson example",
  },
  Name: {
    am: "Անուն",
    en: "Name",
  },
  "Number of floors (osm)": {
    am: "Հարկերի քանակը (osm)",
    en: "Number of floors (osm)",
  },
  Source: {
    am: "Աղբյուր",
    en: "Source",
  },
  "The number of floors of buildings in Armenia, the data on which is available in Openstreetmap.":
    {
      am: "Շենքերի Հարկերի քանակը Հայաստանում, որոնց մասին տվյալները հասանելի են Openstreetmap-ում:",
      en: "The number of floors of buildings in Armenia, the data on which is available in Openstreetmap.",
    },
  Units: {
    am: "Միավորներ",
    en: "Units",
  },
  "kcal/cm²": {
    am: "կկալ/սմ2 չափումներ",
    en: "kcal/cm²",
  },
};

// advanced hint.
// If you want extract all translations from your state, uncomment next line:
// window.EXTRACT_TRANSLATES = translations;

/** Internal storybook code: */
export const Default = App.bind({});
export default {
  title: "Map/Basic",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};
