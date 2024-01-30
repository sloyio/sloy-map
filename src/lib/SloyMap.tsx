import { ComponentProps, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, sloyTheme } from "sloy-ui";
import maplibregl from "maplibre-gl";
import MapGl, { MapProvider } from "react-map-gl";
import { MapContextProvider } from "./state/MapProvider";
import { Copyright } from "./components/Copyright/Copyright";
import { Sidebars } from "./components/Sidebars";
import { OverrideCardFn, OverrideLayersFn } from "./types/uiTypes";
import { setConfig, setAppLoaded } from "./state/slice";
import { VisualisationLayers } from "./visualLayers/VisualisationLayers";
import { InputLayer, createLayers } from "@/layers/createLayer";
import { InputSource, createSources } from "@/sources/createSources";
import { setTranslations } from "./helpers/extractTranslations";
import { IMapProps, IMapState } from "./types";
import { useAppSelector } from "./state";
import { createAppState } from "./helpers/createAppState";
// import { TerranMap, terrainProps } from "./visualLayers/ContourVisualLayer";
import "sloy-ui/style.css";
import "maplibre-gl/dist/maplibre-gl.css";

export interface SloyMapProps {
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
  locale?: string;
  translations?: Record<string, Record<string, string>>;
  mapState: IMapState;
  mapProps?: IMapProps;
  sources: InputSource[];
  layers: InputLayer[];
  theme?: ComponentProps<typeof ThemeProvider>["theme"];
  children?: ReactNode;
}

export function SloyMap({
  locale = "en-EN",
  theme = sloyTheme,
  children,
  translations,
  overrideCard,
  overrideLayers,
  mapState,
  sources,
  layers,
  mapProps = {},
}: SloyMapProps) {
  const dispatch = useDispatch();
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);

  useEffect(() => {
    const appState = createAppState([
      {
        copyright: {},
        mapState,
      },
      createSources(sources),
      createLayers(layers),
    ]);

    dispatch(
      setConfig(
        setTranslations({
          state: appState,
          locale,
          translations,
        }),
      ),
    );
  }, [dispatch, layers, locale, mapState, sources, translations]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MapProvider>
        <MapContextProvider
          locale={locale}
          translations={translations}
          overrideCard={overrideCard}
          overrideLayers={overrideLayers}
        >
          <MapGl
            id="sloyMapGl"
            {...mapState}
            initialViewState={{
              zoom: 15,
              pitch: 0,
              ...mapState.initialViewState,
            }}
            minZoom={mapState.minZoom || 11}
            maxZoom={mapState.maxZoom || 20}
            maxPitch={mapState.maxPitch || 85}
            // hash
            mapLib={maplibregl}
            antialias
            reuseMaps
            onLoad={() => dispatch(setAppLoaded())}
            // terrain={terrainProps}
            {...mapProps}
            style={{
              width: "100vw",
              height: "100vh",
              ...mapProps.style,
            }}
          >
            {/* <TerranMap /> */}
            {isAppLoaded && <VisualisationLayers />}
            {children}
          </MapGl>
          {isAppLoaded && <Sidebars />}
          <Copyright />
        </MapContextProvider>
      </MapProvider>
    </ThemeProvider>
  );
}
