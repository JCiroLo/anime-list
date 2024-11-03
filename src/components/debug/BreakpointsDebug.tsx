import { Divider, List, Paper } from "@mui/material";

import { Debug } from "@/components";
import { useBreakpoints } from "@/hooks";

const BreakpointsDebug = () => {
  const breakpoints = useBreakpoints();

  return (
    <List component={Paper}>
      <Debug.Boolean value={Boolean(breakpoints.isMobile)} label="Is Mobile" />
      <Debug.Boolean value={Boolean(breakpoints.isTablet)} label="Is Tablet" />
      <Debug.Boolean value={Boolean(breakpoints.isLaptop)} label="Is Laptop" />
      <Debug.Boolean value={Boolean(breakpoints.isDesktop)} label="Is Desktop" />
      <Debug.Boolean value={Boolean(breakpoints.isWide)} label="Is Wide" />
      <Debug.Boolean value={Boolean(breakpoints.isUltraWide)} label="Is Ultra Wide" />
      <Divider />
      <Debug.Boolean value={Boolean(breakpoints.isTabletOrBelow)} label="Is Tablet Or Below" />
      <Debug.Boolean value={Boolean(breakpoints.isLaptopOrBelow)} label="Is Laptop Or Below" />
      <Debug.Boolean value={Boolean(breakpoints.isDesktopOrBelow)} label="Is Desktop Or Below" />
      <Debug.Boolean value={Boolean(breakpoints.isWideOrBelow)} label="Is Wide Or Below" />
    </List>
  );
};

export default BreakpointsDebug;
