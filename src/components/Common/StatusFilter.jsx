import React from "react";
import { Form } from "react-bootstrap";

const StatusFilter = ({ body, setBody, statusFilterOptionArr }) => {
  return (
    <Form.Select
      className="select text-muted"
      aria-label="Default select example"
      defaultValue={body.status}
      value={body.status}
      onChange={(e) =>
        setBody((p) => ({
          ...p,
          status: e.target.value,
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
