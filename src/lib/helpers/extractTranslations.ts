import { IApp, SourceProperty } from "@/types";
import { getProperty } from "dot-prop";

export function extractTranslations(
  state: IApp,
): Record<string, Record<string, string>> {
  const fromLayers = Object.values(state.layers).reduce<string[]>(
    (all, { title, link, description }) => {
      if (title) {
        all.push(title);
      }

      if (link?.label) {
        all.push(link.label);
      }

      if (description) {
        all.push(description);
      }

      return all;
    },
    [],
  );

  const fromSources = Object.values(state.sources).reduce<string[]>(
    (all, source) => {
      if (source.properties) {
        Object.values(source.properties).forEach((p) => {
          if (p.title) {
            all.push(p.title);
          }
        });
      }

      return all;
    },
    [],
  );

  return fromLayers.concat(fromSources).reduce(
    (all, item) => ({
      ...all,
      [item]: { ru: item, am: item, en: item },
    }),
    {},
  );
}

export function t(
  key: string | undefined = "",
  options: {
    lang: string;
    translations: Record<string, Record<string, string>>;
  },
): string {
  return getProperty(options.translations, `${key}.${options.lang}`) || key;
}

export function setTranslations(
  state: IApp,
  locale: string,
  translations: Record<string, Record<string, string>>,
) {
  const lang = new Intl.Locale(locale).language;
  const layers = Object.values(state.layers).reduce<IApp["layers"]>(
    (all, { title, link, description, ...layer }) => ({
      ...all,
      [layer.id]: {
        ...layer,
        title: t(title, { lang, translations }) as string,
        link: {
          ...link,
          label: t(link?.label, { lang, translations }),
        },
        description: t(description, { lang, translations }),
      },
    }),
    {},
  );

  const sources = Object.values(state.sources).reduce<IApp["sources"]>(
    (all, source) => {
      let properties = source.properties;

      if (source.properties) {
        properties = Object.values(source.properties).reduce<
          Record<string, SourceProperty>
        >(
          (all, p) => ({
            ...all,
            [p.id]: {
              ...p,
              title: t(p.title, { lang, translations }),
            },
          }),
          {},
        );
      }

      return {
        ...all,
        [source.id]: {
          ...source,
          properties,
        },
      };
    },
    {},
  );

  return {
    ...state,
    layers,
    sources,
  };
}
