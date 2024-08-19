import React from "react";
import { useClsx } from "../../hooks";

type TContainer = React.FC<{
  children: React.ReactNode;
  disablePadding?: boolean;
}>;

const Container: TContainer = ({ children, disablePadding }) => {
  const className = useClsx("container", "mx-auto", { "px-4": !disablePadding });

  return <div className={className}>{children}</div>;
};

export default Container;
