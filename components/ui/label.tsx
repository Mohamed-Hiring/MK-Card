import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ className = "", ...props }) => {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    />
  );
};

export default Label;
