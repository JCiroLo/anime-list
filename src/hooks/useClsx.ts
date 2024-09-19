import { useMemo } from "react";
import { clsx } from "clsx";

import type { ClassValue } from "clsx";

function useClsx(input: ClassValue | ClassValue[]): string | string[] {
  const className = useMemo(() => (Array.isArray(input) ? input.map(clsx) : clsx(input)), [input]);

  return className;
}

export default useClsx;
