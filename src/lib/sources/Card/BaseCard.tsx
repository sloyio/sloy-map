import { useContext, useMemo } from "react";
import { getProperty } from "dot-prop";
import { useSelector } from "react-redux";
import {
  Button,
  ButtonSize,
  ButtonType,
  Card,
  CardBlock,
  Link,
  LinkSize,
  Tag,
} from "sloy-ui";
import { copyrightSelector } from "@/state/selectors";
import { ISource, ICard } from "@/types";
import { MapContext } from "@/state/MapProvider";
import { getStringFromStringOrArray } from "@/helpers/getStringFromStringOrArray";
import { getYearStringByValue } from "@/helpers/getYearNameByValue";
import { OverrideCardFn } from "@/types/uiTypes";
import { CardActions } from "./components/CardActions";
import { Sources } from "./components/Sources/Sources";

interface Props {
  coordinates: [number, number] | number[];
  values?: { [name: string]: any };
  card?: ICard;
  source?: ISource;
  overrideCard?: OverrideCardFn;
}

export function BaseCard({
  values = {},
  coordinates = [],
  card,
  source,
  overrideCard = (props) => props.cardProps,
}: Props) {
  const copyright = useSelector(copyrightSelector);
  const { locale } = useContext(MapContext);

  const uiCardProps = useMemo(() => {
    if (!card || !source) return null;

    const defaultBlocks = (card?.blocks || [])
      ?.map((block) => ({
        ...block,
        title: getProperty(source, `properties.${block.id}.title`) || block.id,
        value: getProperty(values, String(block.id)),
      }))
      .filter((block) => block.type !== "value" || block.value);

    const overrided = overrideCard({
      cardProps: {
        title: getStringFromStringOrArray(values, card.title),
        cover: card.cover
          ? (card.rootSrc || "") +
            getStringFromStringOrArray(values, card.cover)
          : undefined,
        description: getStringFromStringOrArray(values, card.description),
        additionalInfo: card.additionalInfo?.map((i) =>
          String(getStringFromStringOrArray(values, i)),
        ),
        actions: coordinates ? (
          <CardActions coordinates={coordinates} />
        ) : undefined,
        blocks: defaultBlocks,
      },
      source,
      values,
    });

    overrided.blocks = (overrided.blocks || [])
      .map((block) => {
        const value: string | undefined = getProperty(
          values,
          String(block?.id),
        );
        const deps: string | undefined = getProperty(
          values,
          String(block?.deps),
        );
        const content: string | undefined = getProperty(
          values,
          String(block?.content),
        );

        if (block.type === "tag" && block.id && value) {
          return {
            ...block,
            type: "value",
            value: value ? (
              <Tag
                color={getProperty(
                  source,
                  `properties.${block.id}.values.${value}.color`,
                )}
              >
                {value}
              </Tag>
            ) : undefined,
          };
        }

        if (block.type === "age" && deps) {
          return {
            ...block,
            type: "value",
            value: getYearStringByValue(deps),
          };
        }

        if (block.type === "string[]" && value) {
          return {
            ...block,
            type: "value",
            value: Array.isArray(value) ? value.join(". ") : value,
          };
        }

        if (block.type === "datetime" && value) {
          const parsedDate = new Date(value);
          if (parsedDate) {
            return {
              ...block,
              type: "value",
              value: parsedDate.toLocaleString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              }),
            };
          }

          return {
            ...block,
            type: "value",
            value,
          };
        }

        if (block.type === "action-link" && content) {
          return {
            ...block,
            type: "value",
            title: "",
            value: value ? (
              <Button
                fullWidth
                type={ButtonType.ACCENT}
                size={ButtonSize.MEDIUM}
                href={value}
              >
                {content}
              </Button>
            ) : undefined,
          };
        }

        if (
          typeof block.value === "string" &&
          block.value?.startsWith("http")
        ) {
          return {
            ...block,
            value: (
              <Link href={block.value} size={LinkSize.SMALL}>
                {block.value}
              </Link>
            ),
          };
        }

        return block;
      })
      .filter((block) => block.type !== "value" || block.value);

    if (source.copyright.length) {
      overrided.blocks.push({ type: "divider" });
      overrided.blocks.push({
        type: "section",
        title: "Источники",
        value: (
          <Sources sources={source.copyright.map((item) => copyright[item])} />
        ),
      });
    }

    // @ts-expect-error
    if (typeof window.SLOY_DEV_JSON === "boolean" && window.SLOY_DEV_JSON) {
      overrided.blocks.push({ type: "divider" });
      overrided.blocks.push({
        type: "section",
        title: "Raw data",
        value: (
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(values, null, 2)}
          </pre>
        ),
      });
    }

    return overrided;
  }, [card, overrideCard, values, coordinates, source, locale, copyright]);

  if (!values || !card || !uiCardProps) {
    return null;
  }

  return <Card {...uiCardProps} blocks={uiCardProps.blocks as CardBlock[]} />;
}
