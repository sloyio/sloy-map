import { useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Accordion, AccordionItem, Divider } from "sloy-ui";
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
            horizontalGap={16}
            verticalGap={16}
          >
            {isActive ? (
              <>
                {overrideLayers?.(layer)}
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
