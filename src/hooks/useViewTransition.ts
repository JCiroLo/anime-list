import { useCallback } from "react";
import { flushSync } from "react-dom";

function useViewTransition() {
  const doTransition = useCallback((callback: () => void) => {
    if (!document.startViewTransition) {
      callback();
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        callback();
      });
    });
  }, []);

  return doTransition;
}

export default useViewTransition;
