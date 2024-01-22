import { useDispatch, useSelector } from "react-redux";
import maplibregl from "maplibre-gl";
import MapGl, { MapProvider } from "react-map-gl";
import {
  activeLayerSelector,
  isAppLoadedSelector,
  layersSelector,
} from "@/state/selectors";
import { MapContextProvider } from "./state/MapProvider";
import { VisualisationLayer } from "./visualLayers/VisualisationLayer";
import { Copyright } from "./components/Copyright/Copyright";
import { Sidebars } from "./components/Sidebars";
import { OverrideCardFn, OverrideLayersFn } from "./types/uiTypes";
import { setAppLoaded } from "./state/slice";
import { IMapProps } from "./types";
// import { TerranMap, terrainProps } from "./visualLayers/ContourVisualLayer";

import "maplibre-gl/dist/maplibre-gl.css";

function MapLayers() {
  const layers = useSelector(layersSelector);
  const activeLayer = useSelector(activeLayerSelector);

  if (!activeLayer) return null;

  return (
    <>
      {layers[activeLayer]?.visualisationLayers.map((vId) => (
        <VisualisationLayer key={vId} id={vId} />
      ))}
    </>
  );
}

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
  const isAppLoaded = useSelector(isAppLoadedSelector);

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
          {isAppLoaded && <MapLayers />}
          {children}
        </MapGl>
        {isAppLoaded && <Sidebars />}
        <Copyright />
      </MapContextProvider>
    </MapProvider>
  );
}
