import React from "react";
import { Form } from "react-bootstrap";

const Toggle = ({ isChecked, onChange, disabled = false }) => {
  return (
    <Form.Check // prettier-ignore
      type="switch"
      disabled={disabled}
      id="custom-switch"
      onClick={onChange}
      checked={isChecked}
      //   label="Check this switch"
    />
  );
};

export default Toggle;
