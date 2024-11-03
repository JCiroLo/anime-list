import { FC, ReactNode } from "react";
import { Stack } from "@mui/material";

import { Text } from "@/components";

import type { StackProps } from "@mui/material";
import type { TTextProps } from "@/components/ui/Text";

type TErrorMessageProps = {
  icon?: ReactNode;
  children?: ReactNode;
  title?: string;
  subtitle?: ReactNode | string;
  slotProps?: {
    root?: StackProps;
    title?: TTextProps;
    subtitle?: TTextProps;
  };
  centered?: boolean;
};

const ErrorMessage: FC<TErrorMessageProps> = ({ icon, children, title, subtitle, slotProps, centered }) => {
  return (
    <Stack alignItems={centered ? "center" : "flex-start"} spacing={2} paddingY={4} {...slotProps?.root}>
      <Stack alignItems={centered ? "center" : "flex-start"}>
        {icon}
        {title && (
          <Text component="p" variant="h1" textWrap="balance" textAlign={centered ? "center" : "left"} {...slotProps?.title}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text textAlign={centered ? "center" : "left"} {...slotProps?.subtitle}>
            {subtitle}
          </Text>
        )}
      </Stack>
      {children}
    </Stack>
  );
};

export default ErrorMessage;
