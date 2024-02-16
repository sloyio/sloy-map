import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import qs from "qs";
import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import { IBasemapMapLayer, ISloyState, useAppSelector } from "./state";
import { useMapContext, useSloyMap } from "./helpers/useSloy";
import { init } from "./state/slice";

function useInitTerrain() {
  const map = useSloyMap();
  const { terrainSource } = useMapContext();
  const activeVisualizations = useAppSelector((state) =>
    (state.sloy.activeLayers || [])
      .map((id) => state.sloy.config.layers[id]?.visualizations)
      .flat()
      .map((vId) => state.sloy.config.visualizations[vId])
      .filter(Boolean),
  );

  const shouldShowTerrain = useMemo(
    () => activeVisualizations.some((v) => v.source === terrainSource),
    [activeVisualizations, terrainSource],
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

function useInitUrl() {
  const dispatch = useDispatch();
  const activeLayers = useAppSelector((state) => state.sloy.activeLayers);
  const activeCard = useAppSelector((state) => state.sloy.activeCard);

  useEffect(() => {
    const params = {
      ...qs.parse(window.location.search.slice(1)),
      activeLayers,
      activeCard,
    };

    history.pushState(
      params,
      "",
      "?" + qs.stringify(params) + window.location.hash,
    );
  }, [activeCard, activeLayers]);

  useEffect(() => {
    const onPopState = () => {
      const params = qs.parse(
        window.location.search.slice(1),
      ) as Partial<ISloyState>;

      const activeCard = params?.activeCard;
      const activeLayers = params?.activeLayers;

      if (activeCard && activeLayers) {
        dispatch(init({ activeCard, activeLayers }));
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [dispatch]);

  return null;
}

function usePmtiles({ hasPmtiles }: { hasPmtiles?: boolean }) {
  useEffect(() => {
    if (!hasPmtiles) return;

    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, [hasPmtiles]);
}

export function BeforeInit({ hasPmtiles }: { hasPmtiles?: boolean }) {
  usePmtiles({ hasPmtiles });

  return null;
}

export function Init() {
  useInitTerrain();
  useInitBasemap();
  useInitUrl();

  return null;
}
