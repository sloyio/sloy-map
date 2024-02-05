import { useMemo } from "react";
import { getProperty } from "dot-prop";
import { useAppSelector } from "@/state";
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
import { ISource, ICard } from "@/types";
import { getStringFromStringOrArray } from "@/helpers/getStringFromStringOrArray";
import { getYearStringByValue } from "@/helpers/getYearNameByValue";
import { OverrideCardFn } from "@/types/uiTypes";
import { CardActions } from "./components/CardActions";
import { Copyrights } from "./components/Sources/Copyrights";
import { useMapContext } from "@/helpers/useSloy";

interface Props {
  lat?: string;
  lng?: string;
  values?: { [name: string]: any };
  card?: ICard;
  source?: ISource;
  overrideCard?: OverrideCardFn;
}

export function BaseCard({
  values = {},
  lat,
  lng,
  card,
  source,
  overrideCard = (props) => props.cardProps,
}: Props) {
  const copyright = useAppSelector((state) => state.sloy.config.copyright);
  const { locale, t } = useMapContext();

  const uiCardProps = useMemo(() => {
    if (!card || !source) return null;

    const defaultBlocks = (card?.blocks || [])
      ?.map((block) => ({
        ...block,
        title:
          t(getProperty(source, `properties.${block.id}.title`)) || block.id,
        value: t(getProperty(values, String(block.id))),
      }))
      .filter((block) => block.type !== "value" || block.value);

    const overrided = overrideCard({
      cardProps: {
        title: t(getStringFromStringOrArray(values, card.title)),
        cover: card.cover
          ? (card.rootSrc || "") +
            getStringFromStringOrArray(values, card.cover)
          : undefined,
        description: t(getStringFromStringOrArray(values, card.description)),
        additionalInfo: card.additionalInfo?.map((i) =>
          t(String(getStringFromStringOrArray(values, i))),
        ),
        actions:
          lat && lng ? <CardActions coordinates={[lng, lat]} /> : undefined,
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
                {t(value)}
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
          try {
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
                  ...block.dateTimeFormat,
                }),
              };
            }
          } catch (e) {
            console.log("parse date error", e);
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
        title: t("Sources"),
        value: (
          <Copyrights
            sources={source.copyright
              .map((item) => copyright[item])
              .filter(Boolean)}
          />
        ),
      });
    }

    if (
      // @ts-expect-error
      typeof window.SLOY_SHOW_INTERNAL_DATA === "boolean" &&
      // @ts-expect-error
      window.SLOY_SHOW_INTERNAL_DATA
    ) {
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
  }, [card, source, overrideCard, values, lng, lat, t, locale, copyright]);

  if (!values || !card || !uiCardProps) {
    return null;
  }

  return <Card {...uiCardProps} blocks={uiCardProps.blocks as CardBlock[]} />;
}