import { IApp, SourceProperty } from "@/types";
import deepmerge from "deepmerge";
import { getProperty } from "dot-prop";
import isPlainObject from "lodash/isPlainObject";

export function extractTranslations(
  state: IApp,
  curentTranslation: Record<string, Record<string, string>> | undefined = {},
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

          if (isPlainObject(p.values) && p.values) {
            all = all.concat(
              Object.values(p.values).reduce(
                // @ts-expect-error
                (all, item) => all.concat([item.title, item.description]),
                [],
              ),
            );
          }
        });
      }

      return all;
    },
    [],
  );

  return deepmerge(
    fromLayers
      .concat(fromSources)
      .sort()
      .reduce(
        (all, item) => ({
          ...all,
          [item]: { am: item, ru: item, en: item },
        }),
        {},
      ),
    curentTranslation,
  );
}

export function t(
  key: string | undefined = "",
  options: {
    lang: string;
    translations: Record<string, Record<string, string>>;
  },
): string {
  if (!key) return "";

  return (
    getProperty(
      options.translations,
      `${String(key)?.replaceAll(".", "\\.")}.${options.lang}`,
    ) || key
  );
}

export function setTranslations({
  state,
  locale,
  translations = {},
}: {
  state: IApp;
  locale: string;
  translations?: Record<string, Record<string, string>>;
}) {
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
        >((all, p) => {
          let values = p.values;

          if (isPlainObject(values) && values) {
            values = Object.keys(values).reduce((all, key) => {
              const item = values?.[key];

              return {
                ...all,
                [key]: {
                  ...item,
                  title: t(item?.title, { lang, translations }),
                  description: t(item?.description, { lang, translations }),
                },
              };
            }, {});
          }

          return {
            ...all,
            [p.id]: {
              ...p,
              title: t(p.title, { lang, translations }),
              values,
            },
          };
        }, {});
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

  const filters = Object.values(state.filters).reduce<IApp["filters"]>(
    (all, { title, description, subTitle, postfix, ...filter }) => ({
      ...all,
      [filter.id]: {
        ...filter,
        title: t(title, { lang, translations }),
        description: t(description, { lang, translations }),
        subTitle: t(subTitle, { lang, translations }),
        postfix: t(postfix, { lang, translations }),
      },
    }),
    {}
  );

  return {
    ...state,
    layers,
    sources,
    filters,
  };
}
