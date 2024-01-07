import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setHash } from "@/helpers/hash";
import { activeLayerSelector } from "@/state/selectors";

type PopupId = string;

export function usePopup() {
  const [popupHash, setOpenedPopup] = useState<PopupId | null>(null);
  const [sourceIdValue, setSourceIdValue] = useState<string | null>(null);

  const activeLayer = useSelector(activeLayerSelector);

  const openPopup = useCallback(
    (id: PopupId, source: string) => {
      setHash(source, id, activeLayer);
    },
    [activeLayer],
  );

  const closePopup = useCallback(() => {
    setSourceIdValue(null);
    setOpenedPopup(null);

    window.location.hash = "";
  }, []);

  const handleOpenPopup = useCallback(() => {
    const [source, ...id] = window.location.hash
      .slice(1)
      .split("/")[0]
      .split("-");

    setOpenedPopup(id.join("-"));
    setSourceIdValue(source);
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", handleOpenPopup, false);

    return () => {
      window.removeEventListener("hashchange", handleOpenPopup, false);
    };
  }, [handleOpenPopup]);

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    handleOpenPopup();
  }, [handleOpenPopup]);

  return {
    popupHash,
    sourceIdValue,
    openPopup,
    closePopup,
  };
}
