import { ICopyright } from "@/types";

export function createCopyrights(copyrights: ICopyright[] = []): {
  copyrights: Record<string, ICopyright>;
} {
  return {
    copyrights: copyrights.reduce(
      (all, copyright) => ({ ...all, [copyright.id]: copyright }),
      {},
    ),
  };
}
