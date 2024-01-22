import { IFilter } from "@/types";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Checkbox, ListGrid, ListGridItem } from "sloy-ui";

export type IFilterGridItem = Partial<ComponentProps<typeof ListGridItem>> & {
  type?: string;
  title?: string;
  count?: number;
  color?: string;
};

interface Props {
  selectedByDefault?: string[];
  items?: IFilterGridItem[];
  onChange?: (state: string[]) => void;
  sortType?: IFilter["sortType"];
}

export function FilterGrid({
  items = [],
  onChange,
  selectedByDefault = [],
  sortType = "alphabetical",
}: Props) {
  const [selected, setSelected] = useState<string[]>(selectedByDefault);

  const toggle = useCallback(
    (type: string) => {
      if (selected.includes(type)) {
        setSelected(selected.filter((s) => s !== type));
      } else {
        setSelected(selected.concat(type));
      }
    },
    [selected],
  );

  useEffect(() => {
    onChange?.(selected);
  }, [onChange, selected]);

  const sortedItems = useMemo(() => {
    switch (sortType) {
      case "alphabetical":
        return items.sort((a, b) =>
          String(a.title || a.type).localeCompare(String(b.title || b.type)),
        );
      case "count":
        return items.sort((a, b) => (b.count || 0) - (a.count || 0));
      case "default":
      default:
        return items;
    }
  }, []);

  if (sortedItems.length === 0) {
    return null;
  }

  return (
    <ListGrid>
      {items.map(({ title, type, count, description, color }) => {
        if (!type) {
          return null;
        }

        return (
          <ListGridItem
            key={type}
            subTitle={count}
            description={description}
            prefix={
              <Checkbox
                isSelected={selected.includes(type)}
                activeColor={color}
                toggle={() => toggle(type)}
              />
            }
          >
            {title || type}
          </ListGridItem>
        );
      })}
    </ListGrid>
  );
}
