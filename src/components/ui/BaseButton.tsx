import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
}

export const BaseButton = ({
  variant,
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  const primaryStyles = "bg-neutral-900 text-white hover:bg-black";
  const secondaryStyles =
    "border-2 border-gray-400 text-gray-900  hover:border-black";

  const variantStyles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button
      className={`${variantStyles} py-2 px-4 rounded-full`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
