import React from "react";
import { Form } from "react-bootstrap";

const TableToggle = ({ classNames, style, onChange, Options, value }) => {
  return (
    <div className={`p-1 rounded   ${classNames}`}>
      <Form.Select
        onChange={onChange}
        value={value}
        style={{
          width: "130px",
          ...(style && style),
        }}
      >
        {Options?.map((item) => (
          <option value={item.value}>{item.label} </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default TableToggle;
