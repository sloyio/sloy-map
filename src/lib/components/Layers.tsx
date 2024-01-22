import { useSelector } from "react-redux";
import { Accordion, AccordionItem } from "sloy-ui";
import { ILayer } from "@/types";
import { layersSelector } from "@/state/selectors";
import { Layer } from "./Layer";

interface Props {
  activeLayer: string | null;
  onToggleClick: (type: string) => void;
}

export function Layers({ activeLayer, onToggleClick }: Props) {
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
            subTitle={layer.subTitle}
            isSelected={isActive}
            toggle={toggle}
          >
            {isActive && <Layer layer={layer} />}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
