import React from "react";
import "./buttonLarge.scss";

const ButtonLarge = ({ color, isLoading, label }) => {
  return (
    <button
      className={`button button-large-wrapper ${color} ${
        isLoading ? "is-loading" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default ButtonLarge;
