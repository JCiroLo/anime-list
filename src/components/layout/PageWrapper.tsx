import { FC, ReactNode } from "react";
import { Box, Container, Stack } from "@mui/material";

type TPageWrapper = FC<{
  content: ReactNode;
  hero?: ReactNode;
  separation?: number;
}>;

const PageWrapper: TPageWrapper = ({ content, hero, separation }) => {
  return (
    <Stack component="main" paddingBottom={16}>
      <Box overflow="hidden" borderRadius={2}>
        {hero}
      </Box>
      <Container sx={{ position: "relative", zIndex: 10, my: separation }}>{content}</Container>
    </Stack>
  );
};

export default PageWrapper;
