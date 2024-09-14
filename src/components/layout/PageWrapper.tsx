import { FC, ReactNode } from "react";
import { Container, useTheme } from "@mui/material";

type TPageWrapper = FC<{
  children: ReactNode;
  topGutter?: number;
  keepHeaderSpacing?: boolean;
}>;

const PageWrapper: TPageWrapper = ({ children, topGutter, keepHeaderSpacing = true }) => {
  const theme = useTheme();

  return (
    <Container
      component="main"
      sx={{ position: "relative", zIndex: 10, mt: topGutter, pt: keepHeaderSpacing ? theme.sizes.header.height : 0, pb: 24 }}
    >
      {children}
    </Container>
  );
};

export default PageWrapper;
