import { useMemo } from "react";
import { Button, ButtonSize, ButtonType, Icon, IconType } from "sloy-ui";
import { useCopyHref } from "@/helpers/useCopyHref";

type Props = {
  coordinates?: [number, number] | number[];
};

const COPY_RESET_TIMEOUT = 2000;

export function CardActions({ coordinates }: Props) {
  const { isCopied: isLinkCopied, onCopy: onCopyLink } = useCopyHref(
    window.location.href,
    COPY_RESET_TIMEOUT,
  );

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
          {isCoordsCopied ? "Скопировано" : coordsString}
        </Button>
      )}
      <Button
        type={ButtonType.DEFAULT}
        size={ButtonSize.SMALL}
        onClick={onCopyLink}
        postfix={<Icon type={IconType.Link} />}
      >
        {isLinkCopied ? "Скопировано" : "Ссылка на объект"}
      </Button>
    </>
  );
}
