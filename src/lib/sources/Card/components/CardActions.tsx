import { useContext, useMemo } from "react";
import { Button, ButtonSize, ButtonType, Icon, IconType } from "sloy-ui";
import { useCopyHref } from "@/helpers/useCopyHref";
import { MapContext } from "@/state/MapProvider";
import { t } from "@/helpers/extractTranslations";

type Props = {
  coordinates?: [number, number] | number[];
};

const COPY_RESET_TIMEOUT = 2000;

const translations = {
  Скопировано: {
    ru: "Скопировано",
    en: "Copied",
    am: "Պատճենված",
  },
  "Ссылка на объект": {
    ru: "Ссылка на объект",
    en: "Object reference",
    am: "Օբյեկտի հղում",
  },
};

export function CardActions({ coordinates }: Props) {
  const { locale } = useContext(MapContext);
  const { isCopied: isLinkCopied, onCopy: onCopyLink } = useCopyHref(
    window.location.href,
    COPY_RESET_TIMEOUT,
  );

  const tr = (key: string) => t(key, { translations, lang: locale.language });

  const coordsString = useMemo(() => {
    if (!coordinates) {
      return "";
    }

    const coords = Array.isArray(coordinates[0])
      ? coordinates[0].flat(2)
      : coordinates;

    return `${coords[0]?.toFixed(6)}, ${coords[1]?.toFixed(6)}`;
  }, [coordinates]);

  const { isCopied: isCoordsCopied, onCopy: onCopyCoords } = useCopyHref(
    coordsString,
    COPY_RESET_TIMEOUT,
  );

  return (
    <>
      {coordsString && (
        <Button
          type={ButtonType.DEFAULT}
          size={ButtonSize.SMALL}
          onClick={onCopyCoords}
          postfix={<Icon type={IconType.Copy} />}
        >
          {isCoordsCopied ? tr("Скопировано") : coordsString}
        </Button>
      )}
      <Button
        type={ButtonType.DEFAULT}
        size={ButtonSize.SMALL}
        onClick={onCopyLink}
        postfix={<Icon type={IconType.Link} />}
      >
        {isLinkCopied ? tr("Скопировано") : tr("Ссылка на объект")}
      </Button>
    </>
  );
}
