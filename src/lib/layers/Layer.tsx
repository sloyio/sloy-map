import { useContext } from "react";
import styled from "styled-components";
import { useAppSelector } from "@/state";
import { Divider } from "sloy-ui";
import { MapFilter } from "@/layers/filters/MapFilter";
import { ILayer } from "@/types";
import { MapContext } from "@/state/context";
import { LayerSource } from "./components/LayerSource";
import { LayerUpdatedAt } from "./components/LayerUpdatedAt";

const LayerFilterTitle = styled.div`
  font-size: 18px;
  line-height: 24px;
  margin: 12px 0;
  font-weight: bold;
`;

const LayerFilterDescription = styled.div`
  font-size: 14px;
  line-height: 21px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 8px 8px;
`;

const LayerFilterDescriptionFooter = styled.div`
  color: ${({ theme }) => theme.text.color.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LayerFilterDescriptionItem = styled.span`
  &:not(:first-child):before {
    content: "· ";
  }
`;

interface Props {
  layer: ILayer;
}

export function Layer({ layer }: Props) {
  const { overrideLayers } = useContext(MapContext);
  const filters = useAppSelector((state) => state.sloy.config.filters);

  return (
    <>
      {overrideLayers?.(layer)}
      {(layer.link?.href || layer.description) && (
        <LayerFilterDescription>
          {layer.description}

          <LayerFilterDescriptionFooter>
            {layer.updatedAt && (
              <LayerFilterDescriptionItem>
                <LayerUpdatedAt updatedAt={layer.updatedAt} />
              </LayerFilterDescriptionItem>
            )}
            {layer.link?.href && (
              <LayerFilterDescriptionItem>
                <LayerSource link={layer.link} />
              </LayerFilterDescriptionItem>
            )}
            {layer.license && (
              <LayerFilterDescriptionItem>
                {layer.license}
              </LayerFilterDescriptionItem>
            )}
          </LayerFilterDescriptionFooter>
        </LayerFilterDescription>
      )}
      {layer.filters.map((filterId, i) => {
        const filter = filters[filterId];

        return (
          <div key={filterId}>
            <MapFilter
              key={filter.id}
              title={filter.title}
              filterId={filter.id}
              layerId={layer.id}
              additionalHeaderParams={filter.additionalHeaderParams}
            />
            {layer.filters.length - 1 !== i && <Divider />}
          </div>
        );
      })}
    </>
  );
}
