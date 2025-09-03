import React, { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  fluid = false,
  className = "",
  ...rest
}) => {
  const maxWidthClass = fluid ? "w-full" : "";

  return (
    <div
      className={`container mx-auto ${maxWidthClass} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;
