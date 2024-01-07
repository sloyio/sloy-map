import { useEffect, useState } from "react";

export function copy(text: string) {
  const dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export function useCopyHref(memo: string, resetTimeout?: number) {
  const [isCopied, setCopied] = useState(false);

  // reset on chamge "memo"
  useEffect(() => setCopied(false), [memo]);

  return {
    isCopied,
    onCopy: () => {
      copy(memo);
      setCopied(true);

      if (!resetTimeout) {
        return;
      }

      setTimeout(() => {
        setCopied(false);
      }, resetTimeout);
    },
  };
}
