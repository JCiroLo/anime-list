import { createContext, useEffect, useState } from "react";
import { debounce, useTheme } from "@mui/material";

import type { FC, ReactNode } from "react";

type TBreakpointsContext = {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isWide: boolean;
  isUltraWide: boolean;
  isTabletOrBelow: boolean;
  isLaptopOrBelow: boolean;
  isDesktopOrBelow: boolean;
  isWideOrBelow: boolean;
};

type TBreakpointsProviderProps = {
  children: ReactNode;
};

export const BreakpointsContext = createContext<TBreakpointsContext>({
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: false,
  isWide: false,
  isUltraWide: false,
  isTabletOrBelow: false,
  isLaptopOrBelow: false,
  isDesktopOrBelow: false,
  isWideOrBelow: false,
});

const BreakpointsProvider: FC<TBreakpointsProviderProps> = ({ children }) => {
  const theme = useTheme();

  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isWide: false,
    isUltraWide: false,
    isTabletOrBelow: false,
    isLaptopOrBelow: false,
    isDesktopOrBelow: false,
    isWideOrBelow: false,
  });

  const { values } = theme.breakpoints;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      const isMobile = width < values.sm;
      const isTabletOrBelow = width < values.md;
      const isTablet = isTabletOrBelow && !isMobile;
      const isLaptopOrBelow = width < values.lg;
      const isLaptop = isLaptopOrBelow && !isTablet && !isMobile;
      const isDesktopOrBelow = width < values.xl;
      const isDesktop = isDesktopOrBelow && !isLaptop && !isTablet && !isMobile;
      const isWideOrBelow = width < values.xxl;
      const isWide = isWideOrBelow && !isDesktop && !isLaptop && !isTablet && !isMobile;
      const isUltraWide = width >= values.xxl;

      setBreakpoints({
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isWide,
        isUltraWide,
        isTabletOrBelow,
        isLaptopOrBelow,
        isDesktopOrBelow,
        isWideOrBelow,
      });
    };

    window.addEventListener("resize", debounce(handleResize, 250));

    handleResize();

    return (): void => window.removeEventListener("resize", handleResize);
  }, [values.lg, values.md, values.sm, values.xl, values.xxl]);

  return <BreakpointsContext.Provider value={breakpoints}>{children}</BreakpointsContext.Provider>;
};

export default BreakpointsProvider;
