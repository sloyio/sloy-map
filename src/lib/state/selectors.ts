import { useAppSelector } from "@/state";
import { useMemo } from "react";

export function useActiveItems() {
  const activeLayers = useAppSelector((state) => state.sloy.activeLayers);
  const copyrights = useAppSelector((state) => state.sloy.config.copyrights);
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const visualizations = useAppSelector(
    (state) => state.sloy.config.visualizations,
  );
  const layers = useAppSelector((state) => state.sloy.config.layers);

  return useMemo(() => {
    const activeVisualizationsIds = (activeLayers || [])
      .map((id) => layers[id]?.visualizations || [])
      .flat()
      .filter(Boolean);

    const activeVisualizations = activeVisualizationsIds
      .map((vId) => visualizations[vId])
      .filter(Boolean);

    const activeSourcesIds = activeVisualizations
      .map(({ source }) => source)
      .filter(Boolean);

    const activeSources = activeSourcesIds
      .map((id) => sources[id])
      .filter(Boolean);

    const activeCopyrightsIds = activeSources
      .map(({ copyright }) => copyright)
      .flat();

    const activeCopyrights = activeCopyrightsIds
      .map((id) => copyrights[id])
      .filter(Boolean);

    return {
      activeSources,
      activeSourcesIds,
      activeCopyrights,
      activeCopyrightsIds,
      activeVisualizations,
      activeVisualizationsIds,
    };
  }, [activeLayers, copyrights, layers, sources, visualizations]);
}
