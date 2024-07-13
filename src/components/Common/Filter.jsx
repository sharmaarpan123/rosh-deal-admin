import React from "react";
import { Button, Form } from "react-bootstrap";
import StatusFilter from "./StatusFilter";
import SearchFilter from "./SearchFilter";

const Filter = ({ statusFilterOptionArr, setBody, body, searchHandler }) => {
  return (
    <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
      <li className="d-flex align-items-center gap-10">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          Filter by Status
        </label>
        <StatusFilter
          body={body}
          setBody={setBody}
          statusFilterOptionArr={statusFilterOptionArr}
        />
      </li>
      <li className="">
        <SearchFilter
          body={body}
          setBody={setBody}
          searchHandler={searchHandler}
        />
      </li>
    </ul>
  );
};

export default Filter;
