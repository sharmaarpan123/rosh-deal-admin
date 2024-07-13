import React from "react";
import { Form } from "react-bootstrap";

const Toggle = ({ isChecked , onChange }) => {
  return (
    <Form.Check // prettier-ignore
      type="switch"
      id="custom-switch"
      onClick={onChange}
      checked={isChecked}
      //   label="Check this switch"
    />
  );
};

export default Toggle;
