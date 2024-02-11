import { ComponentProps, useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import qs from "qs";
import { GlobalStyles, sloyTheme } from "sloy-ui";
import maplibregl from "maplibre-gl";
import MapGl, { MapProvider } from "react-map-gl";
import { MapContextProps, MapContextProvider } from "@/state/context";
import { Copyright } from "@/components/Copyright";
import { Sidebars } from "@/components/Sidebars";
import { init, setAppLoaded } from "@/state/slice";
import { createLayers } from "@/helpers/createLayer";
import { createSources } from "@/helpers/createSources";
import {
  IMapProps,
  IMapState,
  InputSloySource,
  InputSloyLayer,
  ICopyright,
} from "@/types";
import { setTranslations } from "@/helpers/extractTranslations";
import { ISloyState, useAppSelector } from "@/state";
import { createAppState } from "@/helpers/createAppState";
import { Init } from "./Init";
import { Visualizations } from "./layers/visualization/Visualizations";
import { createCopyrights } from "./helpers/createCopyrights";
import { PageLoader } from "./components/PageLoader";

import "sloy-ui/style.css";
import "maplibre-gl/dist/maplibre-gl.css";

export interface SloyMapProps extends MapContextProps {
  mapState: IMapState;
  mapProps?: IMapProps;
  sources: InputSloySource[];
  layers: InputSloyLayer[];
  theme?: ComponentProps<typeof ThemeProvider>["theme"];
  copyrights?: ICopyright[];
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
  copyrights,
  layout,
}: SloyMapProps) {
  const dispatch = useDispatch();
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);

  useEffect(() => {
    const queryParams = qs.parse(
      window.location.search.slice(1),
    ) as Partial<ISloyState>;

    const activeCard = queryParams?.activeCard;
    const activeLayers = queryParams?.activeLayers?.map((l) =>
      encodeURIComponent(l),
    );

    const appState = createAppState([
      { mapState },
      createSources(sources),
      createLayers(layers),
      createCopyrights(copyrights),
    ]);

    const firstLayer = Object.keys(appState.layers)?.[0];

    dispatch(
      init({
        activeCard,
        activeLayers: activeLayers || (firstLayer ? [firstLayer] : []),
        config: setTranslations({
          state: appState,
          locale,
          translations,
        }),
      }),
    );
  }, [copyrights, dispatch, layers, locale, mapState, sources, translations]);

  const onLoad = useCallback(() => dispatch(setAppLoaded()), [dispatch]);

  const initialViewState = {
    zoom: 15,
    pitch: 0,
    ...mapState.initialViewState,
  };

  const content = useMemo(() => {
    if (!isAppLoaded) {
      return <PageLoader />;
    }

    return (
      <>
        <Visualizations />
        {children}
      </>
    );
  }, [children, isAppLoaded]);

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
          layout={layout}
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
            {isAppLoaded && <Init />}
            {children}
            {content}
          </MapGl>
          {isAppLoaded && <Sidebars />}
          <Copyright />
        </MapContextProvider>
      </MapProvider>
    </ThemeProvider>
  );
}
