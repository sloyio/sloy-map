import { IApp } from "@/types";
import deepmerge from "deepmerge";

export function createAppState(sloys: Partial<IApp>[]): IApp {
  return deepmerge.all<IApp>(sloys);
}
