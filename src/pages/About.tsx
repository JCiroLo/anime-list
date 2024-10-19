import { FC } from "react";
import { Stack } from "@mui/material";

import { PageWrapper, Text } from "@/components";

const About: FC = () => {
  return (
    <PageWrapper
      content={
        <Stack>
          <Text variant="h1">About</Text>
        </Stack>
      }
    ></PageWrapper>
  );
};

export default About;
