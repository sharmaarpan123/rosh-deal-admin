import React from "react";
import { Form } from "react-bootstrap";

const StatusFilter = ({ body, setBody, statusFilterOptionArr, statusKey }) => {
  return (
    <Form.Select
      className="select text-muted"
      aria-label="Default select example"
      defaultValue={body[statusKey]}
      value={body[statusKey]}
      onChange={(e) =>
        setBody((p) => ({
          ...p,
          [statusKey]: e.target.value,
        }))
      }
    >
      {statusFilterOptionArr?.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </Form.Select>
  );
};

export default StatusFilter;
