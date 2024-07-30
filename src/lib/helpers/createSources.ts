import { IApp, ICard, ISource, SourceProperty } from "@/types";
import { InputSloySource } from "@/types/inputTypes";
import { nanoid } from "nanoid";

export function createSources(sources: InputSloySource[]): {
  cards: IApp["cards"];
  sources: IApp["sources"];
} {
  const { cards, finalSources } = sources.reduce<{
    cards: Record<string, ICard>;
    finalSources: Record<string, ISource>;
  }>(
    (all, source) => {
      const id = nanoid(5);

      const properties = (source.properties || []).reduce<
        Record<string, SourceProperty>
      >((all, prop) => ({ ...all, [prop.id]: prop }), {});

      return {
        finalSources: {
          ...all.finalSources,
          [source.id]: { ...source, properties, card: id } as ISource,
        },
        cards: {
          ...all.cards,
          [id]: { ...source.card, id },
        },
      };
    },
    { finalSources: {}, cards: {} },
  );

  return {
    cards,
    sources: finalSources,
  };
}
