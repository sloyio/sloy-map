import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  SloyMap,
  VECTOR_TILES_BUILDING_SOURCE_ID,
  internalTranslations,
  sloyReducer,
} from "@/index";

/** Example: */
const store = configureStore({
  reducer: {
    sloy: sloyReducer,
  },
});

const CITY_VIEW = {
  center: [43.9795, 56.2605],
  zoom: 14.5,
  pitch: 0,
  bearing: 0,
};

const COUNTRY_VIEW = {
  center: [43.9795, 56.2605],
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
        mapStyle: "https://sloy.io/nnovgorod/style.json",
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
          id: VECTOR_TILES_BUILDING_SOURCE_ID,
          copyright: [],
          type: "vector-tiles",
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
            // {
            //   "years": [
            //     { "from": 1723, "to": 1860, "count": 22 },
            //     { "from": 1860, "to": 1917, "count": 26 },
            //     { "from": 1917, "to": 1930, "count": 1 },
            //     { "from": 1930, "to": 1940, "count": 3 },
            //     { "from": 1940, "to": 1955, "count": 35 },
            //     { "from": 1955, "to": 1991, "count": 293 },
            //     { "from": 1991, "to": 2010, "count": 28 },
            //     { "from": 2010, "to": 2024, "count": 104 }
            //   ],
            //   "health": [
            //     { "from": 1, "to": 10 },
            //     { "from": 10, "to": 20 },
            //     { "from": 20, "to": 30 },
            //     { "from": 30, "to": 40 },
            //     { "from": 40, "to": 50 },
            //     { "from": 50, "to": 60 },
            //     { "from": 60, "to": 70 },
            //     { "from": 70, "to": 80 },
            //     { "from": 80, "to": 90 },
            //     { "from": 90, "to": 100 }
            //   ],
            //   "levels": [
            //     { "from": 1, "to": 3, "count": 25527 },
            //     { "from": 3, "to": 5, "count": 2759 },
            //     { "from": 5, "to": 9, "count": 2942 },
            //     { "from": 9, "to": 12, "count": 2029 },
            //     { "from": 12, "to": 16, "count": 195 },
            //     { "from": 16, "to": 21, "count": 308 },
            //     { "from": 21, "to": 25, "count": 37 },
            //     { "from": 25, "to": 31, "count": 39 },
            //     { "from": 31, "to": 52 }
            //   ]
            // }
            {
              title: "Building levels",
              id: "building:levels",
              range: [
                { from: 1, to: 3, color: "#006adb", value: 25527 },
                { from: 3, to: 5, color: "#0084e2", value: 2759 },
                { from: 5, to: 9, color: "#009ee1", value: 2942 },
                { from: 9, to: 12, color: "#00b7d9", value: 2029 },
                { from: 12, to: 16, color: "#00cfc5", value: 195 },
                { from: 16, to: 21, color: "#00e7a3", value: 308 },
                { from: 21, to: 25, color: "#72f674", value: 37 },
                { from: 25, to: 31, color: "#c0fc49", value: 39 },
                { from: 31, to: 52, color: "#ffea00", value: 0 },
              ],
            },
          ],
        },
      ]}
      layers={[
        {
          id: "levels",
          title: "Number of floors (osm)",
          subTitle: "20",
          description:
            "The number of floors of buildings in nnovgorod, the data on which is available in Openstreetmap.",
          initialViewState: CITY_VIEW,
          filters: [
            {
              type: "range",
              filterVisualizations: ["houseLevelsLayer"],
              source: VECTOR_TILES_BUILDING_SOURCE_ID,
              property: "building:levels",
            },
          ],
          visualizations: [
            {
              id: "houseLevelsLayer",
              type: "building-range",
              source: VECTOR_TILES_BUILDING_SOURCE_ID,
              property: "building:levels",
              openable: true,
            },
          ],
        },
      ]}
      copyrights={[
        {
          id: "sloy",
          shortName: "sloy.io",
          url: "https://sloy.io/",
          requiredAttribution: true,
        },
        {
          id: "osm",
          shortName: "OpenStreetMap",
          url: "https://www.openstreetmap.org/",
          requiredAttribution: true,
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
  "The number of floors of buildings in nnovgorod, the data on which is available in Openstreetmap.":
    {
      am: "Շենքերի Հարկերի քանակը Հայաստանում, որոնց մասին տվյալները հասանելի են Openstreetmap-ում:",
      en: "The number of floors of buildings in nnovgorod, the data on which is available in Openstreetmap.",
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
  title: "Map/NNovgorod",
  component: SloyMap,
  parameters: {
    layout: "fullscreen",
  },
};
