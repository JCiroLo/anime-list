/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, ForwardRefExoticComponent, JSXElementConstructor, ReactElement, RefAttributes } from "react";
import { Fade, Slide } from "@mui/material";

import type { TransitionProps } from "@mui/material/transitions";

type TTransition = ForwardRefExoticComponent<
  TransitionProps & { children: ReactElement<any, string | JSXElementConstructor<any>> } & RefAttributes<unknown>
>;
type TFadeTransitionProps = TTransition & {
  Right?: ForwardRefExoticComponent<
    TransitionProps & { children: ReactElement<any, string | JSXElementConstructor<any>> } & RefAttributes<unknown>
  >;
};

const FadeTransition: TFadeTransitionProps = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

const FadeRightTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide ref={ref} direction="right" {...props} />;
});

FadeTransition.Right = FadeRightTransition;

export default FadeTransition;
