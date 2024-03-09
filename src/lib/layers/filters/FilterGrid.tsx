import { useListGridHeader } from "@/helpers/useListGridHeader";
import { IFilter } from "@/types";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Checkbox, ListGrid, ListGridItem, ListGridHeader } from "sloy-ui";

export type IFilterGridItem = Partial<ComponentProps<typeof ListGridItem>> & {
  type?: string;
  title?: string;
  count?: number;
  color?: string;
};

interface Props extends IFilter {
  selectedByDefault?: string[];
  items?: IFilterGridItem[];
  onChange?: (state: string[]) => void;
  sortByArray?: string[];
  totalCount: number;
}

export function FilterGrid({
  items = [],
  onChange,
  selectedByDefault = [],
  sortType,
  sortByArray = [],
  title,
  totalCount,
  subTitle,
  postfix,
  totalType,
  totalHeader,
}: Props) {
  const [selected, setSelected] = useState<string[]>(selectedByDefault);

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

  const allToggle = useCallback(() => {
    if (selected.length === sortedItems.length) {
      setSelected([]);
    } else {
      setSelected(
        sortedItems.reduce<string[]>((acc, { type }) => {
          if (type) {
            return acc.concat(type);
          } else {
            return acc;
          }
        }, []),
      );
    }
  }, [selected.length, sortedItems]);

  const { headerSubtitle, headerDescription, getItemSubtitle } =
    useListGridHeader(totalType, subTitle, totalHeader, totalCount);

  if (sortedItems.length === 0) {
    return null;
  }

  return (
    <ListGrid>
      {postfix && (
        <ListGridHeader
          description={headerDescription}
          subTitle={headerSubtitle}
          postfix={postfix}
          prefix={
            <Checkbox
              isSelected={selected.length === sortedItems.length}
              isIndeterminate={
                selected.length !== sortedItems.length && selected.length > 0
              }
              toggle={allToggle}
            />
          }
        >
          {title}
        </ListGridHeader>
      )}
      {sortedItems.map(({ title, type, count, description, color }) => {
        if (!type) {
          return null;
        }

        return (
          <ListGridItem
            key={type}
            subTitle={getItemSubtitle?.(count)}
            description={description}
            postfix={postfix && String(count)}
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
