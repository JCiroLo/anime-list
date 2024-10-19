import { FC, ReactNode } from "react";
import { Box, Container, Stack } from "@mui/material";

type TPageWrapperProps = {
  content: ReactNode;
  hero?: ReactNode;
  separation?: number;
  headerGutter?: boolean;
};

const PageWrapper: FC<TPageWrapperProps> = ({ content, hero, separation, headerGutter = false }) => {
  return (
    <Stack component="main" paddingTop={(t) => (headerGutter ? t.sizes.header.height : 0)} paddingBottom={16}>
      <Box overflow="hidden" borderRadius={2}>
        {hero}
      </Box>
      <Container sx={{ position: "relative", zIndex: 10, my: separation }}>{content}</Container>
    </Stack>
  );
};

export default PageWrapper;
