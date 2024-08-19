import { useMemo } from "react";
import { type ClassValue, clsx } from "clsx";

function useClsx(...input: ClassValue[]): string {
  const className = useMemo(() => clsx(...input), [input]);

  return className;
}

export default useClsx;
