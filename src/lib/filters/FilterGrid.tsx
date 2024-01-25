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
  sortByArray?: string[];
}

export function FilterGrid({
  items = [],
  onChange,
  selectedByDefault = [],
  sortType,
  sortByArray = [],
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
      case "count":
        return items.sort((a, b) => (b.count || 0) - (a.count || 0));
      case "config":
        return items.sort((a, b) => {
          const indexA = sortByArray.indexOf(String(a.type));
          const indexB = sortByArray.indexOf(String(b.type));

          return indexA - indexB;
        });
      case "alphabetical":
      default:
        return items.sort((a, b) => {
          const valueA = String(a.title || a.type);
          const valueB = String(b.title || b.type);

          if (!isNaN(parseInt(valueA)) && !isNaN(parseInt(valueB))) {
            return parseInt(valueA) - parseInt(valueB);
          }

          return String(a.title || a.type).localeCompare(
            String(b.title || b.type),
          );
        });
    }
  }, [items, sortByArray, sortType]);

  if (sortedItems.length === 0) {
    return null;
  }

  return (
    <ListGrid>
      {sortedItems.map(({ title, type, count, description, color }) => {
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
