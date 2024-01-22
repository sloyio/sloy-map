import { useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Divider, Link, LinkSize } from "sloy-ui";
import { MapFilter } from "@/filters/MapFilter";
import { ILayer } from "@/types";
import { filtersSelector } from "@/state/selectors";
import { MapContext } from "@/state/MapProvider";

const FilterTitle = styled.div`
  font-size: 18px;
  line-height: 24px;
  margin: 12px 0;
  font-weight: bold;
`;

const FilterDescription = styled.div`
  font-size: 14px;
  line-height: 21px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 8px 8px;
`;

interface Props {
  layer: ILayer;
}

export function Layer({ layer }: Props) {
  const { overrideLayers } = useContext(MapContext);
  const filters = useSelector(filtersSelector);

  return (
    <>
      {overrideLayers?.(layer)}
      {(layer.link?.href || layer.description) && (
        <FilterDescription>
          {layer.description}
          {layer.link?.href && (
            <Link size={LinkSize.SMALL} href={layer.link?.href}>
              {layer.link?.label || layer.link?.href}
            </Link>
          )}
        </FilterDescription>
      )}
      {layer.filters.map((filterId, i) => {
        const filter = filters[filterId];

        return (
          <div key={filterId}>
            {filter.type !== "boolean" && filter.title && (
              <FilterTitle key="title">{filter.title}</FilterTitle>
            )}
            <MapFilter
              key={filter.id}
              filterId={filter.id}
              layerId={layer.id}
            />
            {layer.filters.length - 1 !== i && <Divider />}
          </div>
        );
      })}
    </>
  );
}
