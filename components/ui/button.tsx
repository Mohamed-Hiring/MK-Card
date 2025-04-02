// components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
