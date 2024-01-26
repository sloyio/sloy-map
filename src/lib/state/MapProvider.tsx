import { ReactNode, createContext, useCallback, useMemo } from "react";
import { OverrideCardFn, OverrideLayersFn } from "@/types/uiTypes";
import { usePopup } from "./usePopup";
import { t as translate } from "@/helpers/extractTranslations";

export interface IMapContext {
  popupHash: string | null;
  sourceIdValue: string | null;
  openPopup: (p: string, t: string) => void;
  closePopup: VoidFunction;
  locale: Intl.Locale;
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
  t: (key?: string) => string;
}

export const MapContext = createContext<IMapContext>({
  popupHash: null,
  sourceIdValue: null,
  openPopup: () => {},
  closePopup: () => {},
  locale: new Intl.Locale("en-EN"),
  overrideCard: (props) => props?.cardProps,
  overrideLayers: () => null,
  t: () => "",
});

interface Props {
  children: ReactNode;
  locale?: string;
  translations?: Record<string, Record<string, string>>;
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
}

export function MapContextProvider({
  children,
  overrideCard,
  overrideLayers,
  locale: propsLocale = "en-EN",
  translations = {},
}: Props) {
  const { popupHash, sourceIdValue, openPopup, closePopup } = usePopup();

  const locale = useMemo(() => new Intl.Locale(propsLocale), [propsLocale]);

  const t = useCallback(
    (key?: string) => translate(key, { lang: locale.language, translations }),
    [locale.language, translations],
  );

  const value = useMemo(
    () => ({
      popupHash,
      sourceIdValue,
      openPopup,
      closePopup,
      locale: new Intl.Locale(locale),
      overrideCard,
      overrideLayers,
      translations,
      t,
    }),
    [
      popupHash,
      sourceIdValue,
      openPopup,
      closePopup,
      locale,
      overrideCard,
      overrideLayers,
      translations,
      t,
    ],
  );

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
