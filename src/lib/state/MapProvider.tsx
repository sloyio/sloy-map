import { ReactNode, createContext, useMemo } from "react";
import { OverrideCardFn, OverrideLayersFn } from "@/types/uiTypes";
import { usePopup } from "./usePopup";

export interface IMapContext {
  popupHash: string | null;
  sourceIdValue: string | null;
  openPopup: (p: string, t: string) => void;
  closePopup: VoidFunction;
  locale: Intl.Locale;
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
}

export const MapContext = createContext<IMapContext>({
  popupHash: null,
  sourceIdValue: null,
  openPopup: () => {},
  closePopup: () => {},
  locale: new Intl.Locale("en-EN"),
  overrideCard: (props) => props?.cardProps,
  overrideLayers: () => null,
});

interface Props {
  children: ReactNode;
  locale?: string;
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
}

export function MapContextProvider({
  children,
  overrideCard,
  overrideLayers,
  locale = "en-EN",
}: Props) {
  const { popupHash, sourceIdValue, openPopup, closePopup } = usePopup();

  const value = useMemo(
    () => ({
      popupHash,
      sourceIdValue,
      openPopup,
      closePopup,
      locale: new Intl.Locale(locale),
      overrideCard,
      overrideLayers,
    }),
    [
      popupHash,
      sourceIdValue,
      openPopup,
      closePopup,
      locale,
      overrideCard,
      overrideLayers,
    ],
  );

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
