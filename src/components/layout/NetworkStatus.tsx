import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

import { Text } from "@/components";
import { useNetworkState } from "@/hooks";

const NetworkStatus = () => {
  const theme = useTheme();
  const { isOnline } = useNetworkState();

  const [showAlert, setShowAlert] = useState(!isOnline);

  useEffect(() => {
    if (isOnline) {
      setTimeout(() => setShowAlert(false), 1000);
    } else {
      setShowAlert(true);
    }
  }, [isOnline]);

  return (
    <Stack
      position="fixed"
      zIndex="snackbar"
      bottom={showAlert ? 0 : -20}
      left={0}
      right={0}
      alignItems="center"
      bgcolor={isOnline ? theme.palette.success.dark : theme.palette.error.main}
      sx={{ transition: theme.transitions.create(["bottom"]) }}
    >
      <Text variant="caption" fontWeight={500} color="white">
        {isOnline ? "Connected" : "You are offline"}
      </Text>
    </Stack>
  );
};

export default NetworkStatus;
