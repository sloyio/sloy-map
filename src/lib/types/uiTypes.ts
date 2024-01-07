import { ReactNode } from "react";
import { ICardBlock, ILayer, ISource } from "./types";

export interface UiCardProps {
  cover?: string;
  actions?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  additionalInfo?: string[];
  blocks?: ICardBlock[];
  footerActions?: ReactNode;
  loading?: boolean;
}

export type OverrideCardFn = (props: {
  cardProps: UiCardProps;
  source: ISource;
  values: Record<string, any>;
}) => UiCardProps;

export type OverrideLayersFn = (layer: ILayer) => ReactNode;
