import React, { ReactNode } from "react";

function Button({
  children,
  onClick = () => {},
  title,
  color,
  type = "button",
}: {
  onClick?: () => void;
  children: ReactNode;
  title?: string;
  color?: "bg-blue-500" | "bg-red-500" | "bg-green-500";
  type?: "submit" | "reset" | "button";
}) {
  return (
    <button
      className={`${
        color ? color : "bg-blue-500"
      } text-f px-4 py-2 rounded hover:brightness-90`}
      onClick={onClick}
      title={title}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
