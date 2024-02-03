import { ReactNode, createContext, useCallback, useMemo } from "react";
import { OverrideCardFn, OverrideLayersFn } from "@/types/uiTypes";
import { t as translate } from "@/helpers/extractTranslations";

export interface IMapContext {
  locale: Intl.Locale;
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
  t: (key?: string) => string;
  terrainSource?: string;
  layout: {
    hasBaseMap: boolean;
  };
}

export const MapContext = createContext<IMapContext>({
  locale: new Intl.Locale("en-EN"),
  overrideCard: (props) => props?.cardProps,
  overrideLayers: () => null,
  t: () => "",
  terrainSource: undefined,
  layout: {
    hasBaseMap: false,
  },
});

interface Props {
  children: ReactNode;
  locale?: string;
  translations?: Record<string, Record<string, string>>;
  overrideCard?: OverrideCardFn;
  overrideLayers?: OverrideLayersFn;
  terrainSource?: string;
  layout?: {
    hasBaseMap: boolean;
  };
}

export function MapContextProvider({
  children,
  overrideCard,
  overrideLayers,
  locale: propsLocale = "en-EN",
  translations = {},
  terrainSource,
  layout = {
    hasBaseMap: false,
  },
}: Props) {
  const locale = useMemo(() => new Intl.Locale(propsLocale), [propsLocale]);

  const t = useCallback(
    (key?: string) => translate(key, { lang: locale.language, translations }),
    [locale.language, translations],
  );

  const value = useMemo(
    () => ({
      locale: new Intl.Locale(locale),
      overrideCard,
      overrideLayers,
      translations,
      terrainSource,
      layout,
      t,
    }),
    [
      locale,
      overrideCard,
      overrideLayers,
      translations,
      terrainSource,
      layout,
      t,
    ],
  );

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
