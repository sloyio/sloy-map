import { ComponentProps, ReactNode, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, sloyTheme } from "sloy-ui";
import maplibregl from "maplibre-gl";
import MapGl, { MapProvider } from "react-map-gl";
import { MapContextProvider } from "@/state/MapProvider";
import { Copyright } from "@/components/Copyright/Copyright";
import { Sidebars } from "@/components/Sidebars";
import { OverrideCardFn, OverrideLayersFn } from "./types/uiTypes";
import { init, setAppLoaded } from "@/state/slice";
import { VisualisationLayers } from "@/layers/visualLayers/VisualisationLayers";
import { createLayers } from "@/layers/createLayer";
import { createSources } from "@/sources/createSources";
import { IMapProps, IMapState, InputSloySource, InputSloyLayer } from "@/types";
import { setTranslations } from "@/helpers/extractTranslations";
import { useAppSelector } from "@/state";
import { createAppState } from "@/helpers/createAppState";

import "sloy-ui/style.css";

import "maplibre-gl/dist/maplibre-gl.css";
import { Init } from "./Init";

export interface SloyMapProps {
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
  locale?: string;
  translations?: Record<string, Record<string, string>>;
  mapState: IMapState;
  mapProps?: IMapProps;
  sources: InputSloySource[];
  layers: InputSloyLayer[];
  terrainSource?: string;
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
  terrainSource,
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

    const firstLayer = Object.keys(appState.layers)?.[0];

    dispatch(
      init({
        activeLayers: firstLayer ? [firstLayer] : [],
        config: setTranslations({
          state: appState,
          locale,
          translations,
        }),
      }),
    );
  }, [dispatch, layers, locale, mapState, sources, translations]);

  const onLoad = useCallback(() => dispatch(setAppLoaded()), [dispatch]);

  const initialViewState = {
    zoom: 15,
    pitch: 0,
    ...mapState.initialViewState,
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MapProvider>
        <MapContextProvider
          locale={locale}
          translations={translations}
          overrideCard={overrideCard}
          overrideLayers={overrideLayers}
          terrainSource={terrainSource}
        >
          <MapGl
            id="sloyMapGl"
            {...mapState}
            attributionControl={false}
            initialViewState={initialViewState}
            minZoom={mapState.minZoom || 11}
            maxZoom={mapState.maxZoom || 20}
            maxPitch={mapState.maxPitch || 85}
            mapLib={maplibregl}
            antialias
            reuseMaps
            onLoad={onLoad}
            {...mapProps}
            style={{
              width: "100vw",
              height: "100vh",
              ...mapProps.style,
            }}
          >
            {isAppLoaded && <VisualisationLayers />}
            {children}
          </MapGl>
          {isAppLoaded && <Sidebars />}
          {isAppLoaded && <Init />}
          <Copyright />
        </MapContextProvider>
      </MapProvider>
    </ThemeProvider>
  );
}
