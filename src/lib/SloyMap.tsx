import { ReactNode } from "react";
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

import "maplibre-gl/dist/maplibre-gl.css";
import { ReactContour, terrainProps } from "./visualLayers/ContourVisualLayer";

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
interface SloyMapProps {
  mapStyle: string;
  minZoom?: number;
  maxZoom?: number;
  locale?: string;
  initialViewState: {
    latitude: number;
    longitude: number;
    zoom: number;
    pitch: number;
  };
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
  children?: ReactNode;
}

export function SloyMap({
  locale,
  minZoom = 11,
  maxZoom = 20,
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
            // @ts-expect-error
            zoom: 15,
            // @ts-expect-error
            pitch: 0,
            ...initialViewState,
          }}
          minZoom={minZoom}
          maxZoom={maxZoom}
          maxPitch={85}
          // hash
          // @ts-ignore
          mapLib={maplibregl}
          antialias
          reuseMaps
          onLoad={() => dispatch(setAppLoaded())}
          style={{ width: "100vw", height: "100vh", color: "black" }}
          terrain={terrainProps}
          {...mapProps}
        >
          <ReactContour />
          {isAppLoaded && <MapLayers />}
          {children}
        </MapGl>
        {isAppLoaded && <Sidebars />}
        <Copyright />
      </MapContextProvider>
    </MapProvider>
  );
}
