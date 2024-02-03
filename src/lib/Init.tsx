import { useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { IBasemapMapLayer, useAppSelector } from "./state";
import { MapContext } from "./state/MapProvider";
import { useSloyMap } from "./helpers/useSloy";
import { init } from "./state/slice";

function useInitTerrain() {
  const map = useSloyMap();
  const { terrainSource } = useContext(MapContext);
  const activeVisualisationLayers = useAppSelector((state) =>
    (state.sloy.activeLayers || [])
      .map((id) => state.sloy.config.layers[id].visualisationLayers)
      .flat()
      .map((vId) => state.sloy.config.visualisationLayers[vId]),
  );

  const shouldShowTerrain = useMemo(
    () => activeVisualisationLayers.some((v) => v.source === terrainSource),
    [activeVisualisationLayers, terrainSource],
  );

  useEffect(() => {
    if (map && terrainSource && map.getSource(terrainSource)) {
      if (shouldShowTerrain) {
        map.setTerrain({
          source: terrainSource,
          exaggeration: 1,
        });
      } else {
        map.setTerrain(null);
      }
    }
  }, [map, shouldShowTerrain, terrainSource]);

  return null;
}

function useInitBasemap() {
  const dispatch = useDispatch();
  const map = useSloyMap();
  const mapLayers = useMemo(
    () =>
      (map?.getStyle()?.layers as IBasemapMapLayer[])?.map(({ id }) => ({
        id,
        active: Boolean(map?.getStyle(id)),
      })) || [],
    [map],
  );

  useEffect(() => {
    if (mapLayers) {
      dispatch(
        init({
          basemap: {
            mapLayers: mapLayers,
          },
        }),
      );
    }
  }, [dispatch, mapLayers]);

  return null;
}

export function Init() {
  useInitTerrain();
  useInitBasemap();

  return null;
}
