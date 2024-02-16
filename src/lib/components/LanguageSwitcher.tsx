import { useContext, useEffect, useMemo, useState } from "react";
import {
  Popover,
  Menu,
  MenuItem,
  Button,
  Icon,
  IconType,
  SegmentedControl,
} from "sloy-ui";
import { useIsDesktop } from "@/helpers/mediaQueries";
import { MapContext } from "@/state/context";
import { useDispatch } from "react-redux";
import { setLocale } from "..";

export function LanguageSwitcher() {
  const { availableLocales = [] } = useContext(MapContext);

  const items = useMemo(
    () => availableLocales.map((l) => new Intl.Locale(l)?.language),
    [availableLocales],
  );

  const dispatch = useDispatch();
  const [activeElem, setActiveElem] = useState<number>(0);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    dispatch(setLocale(availableLocales[activeElem]));
  }, [activeElem, availableLocales, dispatch, items]);

  if (!items.length) {
    return null;
  }

  if (isDesktop) {
    return (
      <SegmentedControl
        items={items}
        activeItemIndex={activeElem}
        onChange={setActiveElem}
      />
    );
  }

  return (
    <Popover placement="top-start">
      <Button prefix={<Icon type={IconType.Earth} />} rounded>
        {items[activeElem]}
      </Button>
      <Menu>
        {items.map((item, i) => (
          <MenuItem onClick={() => setActiveElem(i)}>{item}</MenuItem>
        ))}
      </Menu>
    </Popover>
  );
}
