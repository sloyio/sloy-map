import { useDispatch } from "react-redux";
import maplibregl from "maplibre-gl";
import MapGl, { MapProvider } from "react-map-gl";
import { MapContextProvider } from "./state/MapProvider";
import { Copyright } from "./components/Copyright/Copyright";
import { Sidebars } from "./components/Sidebars";
import { OverrideCardFn, OverrideLayersFn } from "./types/uiTypes";
import { setAppLoaded } from "./state/slice";
import { VisualisationLayers } from "./visualLayers/VisualisationLayers";
import { IMapProps } from "./types";
import { useAppSelector } from "./state";
// import { TerranMap, terrainProps } from "./visualLayers/ContourVisualLayer";

import "maplibre-gl/dist/maplibre-gl.css";

export interface SloyMapProps extends IMapProps {
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
  locale?: string;
}

export function SloyMap({
  locale,
  minZoom = 11,
  maxZoom = 20,
  maxPitch = 85,
  initialViewState,
  children,
  overrideCard,
  overrideLayers,
  ...mapProps
}: SloyMapProps) {
  const dispatch = useDispatch();
  const isAppLoaded = useAppSelector((state) => state.sloy.appLoaded);

  return (
    <MapProvider>
      <MapContextProvider
        locale={locale}
        overrideCard={overrideCard}
        overrideLayers={overrideLayers}
      >
        <MapGl
          id="sloyMapGl"
          initialViewState={{
            zoom: 15,
            pitch: 0,
            ...initialViewState,
          }}
          minZoom={minZoom}
          maxZoom={maxZoom}
          maxPitch={maxPitch}
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
  );
}
