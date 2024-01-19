import { useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Accordion, AccordionItem, Divider, Link, LinkSize } from "sloy-ui";
import { MapFilter } from "@/filters/MapFilter";
import { ILayer } from "@/types";
import { filtersSelector, layersSelector } from "@/state/selectors";
import { MapContext } from "@/state/MapProvider";

interface Props {
  activeLayer: string | null;
  onToggleClick: (type: string) => void;
}

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

export function Layers({ activeLayer, onToggleClick }: Props) {
  const { overrideLayers } = useContext(MapContext);
  const filters = useSelector(filtersSelector);
  const layers = useSelector(layersSelector);

  return (
    <Accordion>
      {Object.values(layers).map((layer: ILayer) => {
        const isActive = layer.id === activeLayer;
        const toggle = () => onToggleClick(layer.id);

        return (
          <AccordionItem
            key={layer.id}
            title={layer.title}
            isSelected={isActive}
            toggle={toggle}
          >
            {isActive ? (
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
            ) : null}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
