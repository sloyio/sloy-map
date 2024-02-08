import { IApp } from "@/types";
import deepmerge from "deepmerge";
import { extractTranslations } from "./extractTranslations";

export function createAppState(sloys: Partial<IApp>[]): IApp {
  const state = deepmerge.all<IApp>(sloys);

  // @ts-expect-error
  if (typeof window.EXTRACT_TRANSLATES === "object") {
    // @ts-expect-error
    console.log(extractTranslations(state, window.EXTRACT_TRANSLATES));
  }

  return state;
}
