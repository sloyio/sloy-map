import { ComponentProps, useCallback, useEffect, useState } from "react";
import { Checkbox, ListGrid, ListGridItem } from "sloy-ui";

export type IFilterGridItem = Partial<ComponentProps<typeof ListGridItem>> & {
  type?: string;
  color?: string;
};

interface Props {
  selectedByDefault?: string[];
  items?: IFilterGridItem[];
  onChange?: (state: string[]) => void;
}

export function FilterGrid({ items, onChange, selectedByDefault = [] }: Props) {
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

  if (!items) {
    return null;
  }

  return (
    <ListGrid>
      {items.map(({ type, subTitle, description, color }) => {
        if (!type) {
          return null;
        }

        return (
          <ListGridItem
            key={type}
            subTitle={subTitle}
            description={description}
            prefix={
              <Checkbox
                isSelected={selected.includes(type)}
                activeColor={color}
                toggle={() => toggle(type)}
              />
            }
          >
            {type}
          </ListGridItem>
        );
      })}
    </ListGrid>
  );
}
