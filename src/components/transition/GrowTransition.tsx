import { forwardRef, ReactElement } from "react";
import { Grow } from "@mui/material";

import type { TransitionProps } from "@mui/material/transitions";

const GrowTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

export default GrowTransition;
