import React from "react";
import { components } from "react-select";

const ReactSelectNoOptionMessage = ({ message, ...props }) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span className="custom-css-class">{message}</span>
    </components.NoOptionsMessage>
  );
};

export default ReactSelectNoOptionMessage;
