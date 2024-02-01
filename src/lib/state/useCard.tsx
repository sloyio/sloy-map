import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCard } from "./slice";
import { State, useAppSelector } from ".";

export function useCard() {
  const dispatch = useDispatch();
  const cards = useAppSelector((state) => state.sloy.config.cards);
  const activeCard = useAppSelector((state) => state.sloy.activeCard);
  const sources = useAppSelector((state) => state.sloy.config.sources);
  const visualisationLayers = useAppSelector(
    (state) => state.sloy.config.visualisationLayers,
  );

  const openCard = useCallback(
    (params: State["sloy"]["activeCard"]) => {
      dispatch(setCard(params));
    },
    [dispatch],
  );

  const closeCard = useCallback(() => {
    dispatch(setCard(null));
  }, [dispatch]);

  const cardSourceId = activeCard?.visualisationLayerId
    ? visualisationLayers[activeCard?.visualisationLayerId].source
    : null;

  const cardSource = cardSourceId ? sources[cardSourceId] : null;

  const card = cardSource?.card ? cards[cardSource?.card] : null;

  return {
    isCardActive: Boolean(activeCard?.visualisationLayerId),
    card,
    cardId: activeCard?.id,
    cardLngLat: activeCard?.lngLat || null,
    cardVisualisationLayerId: activeCard?.visualisationLayerId,
    cardSourceId,
    cardSource,
    openCard,
    closeCard,
  };
}
