import React from "react";

const TableHeaderCheckbox = ({ label, id, onChange }) => {
  return (
    <label htmlFor={id} className="d-flex gap-10">
      {label}{" "}
      <input
        onChange={onChange}
        id={id}
        type="checkbox"
      />
    </label>
  );
};

export default TableHeaderCheckbox; 