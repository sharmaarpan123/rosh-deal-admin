import React from "react";
import { Form } from "react-bootstrap";

const TableToggle = ({ classNames, style, onChange, Options, value }) => {
  return (
    <div
      className={`p-1 rounded   ${classNames}`}
      style={{
        width: "fit-content",
      }}
    >
      <Form.Select
        onChange={onChange}
        value={value}
        style={{
          width: "130px",
          padding: "0 4px 0 4px",
          ...(style && style),
        }}
      >
        {Options?.map((item) => (
          <option style={{
            height: "10px",
          }} value={item.value}>{item.label} </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default TableToggle;
