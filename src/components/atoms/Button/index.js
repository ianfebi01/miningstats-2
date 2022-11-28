import React from "react";

const Button = ({ label, color, isLoading, ...rest }) => {
  return (
    <button
      className={`button ${color} ${isLoading && "is-loading"}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
