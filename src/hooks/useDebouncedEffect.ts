import { useEffect } from "react";

type TUseDebouncedEffect = (callback: () => void, dependencies: unknown[], delay?: number) => void;

const useDebouncedEffect: TUseDebouncedEffect = (callback, dependencies, delay = 300) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies, delay]);
};

export default useDebouncedEffect;
