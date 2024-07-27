import React from "react";
import { Button, Form } from "react-bootstrap";
import StatusFilter from "./StatusFilter";
import SearchFilter from "./SearchFilter";
import {
  paymentStatusOptions,
  slotCompletedStatusOptions,
} from "../../utilities/const";

const Filter = ({
  statusFilterOptionArr,
  setBody,
  body,
  searchHandler,
  ShowPaymentStatus = false,
  ShowSlotStatus = false,
  showSearch = true,
}) => {
  const clearFilter = () => {
    setBody((p) => ({
      ...p,
      paymentStatus: "",
      isSlotCompleted: "",
      status: "",
      search: "",
      page: 1,
      offset: 0,
      limit: 10,
    }));
  };
  return (
    <ul className="list-unstyled ps-0 mb-0 d-flex align-items-end gap-10 flex-wrap">
      <li className="d-flex flex-column align-items-center gap-10">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          Status
        </label>
        <StatusFilter
          body={body}
          setBody={setBody}
          statusKey={"status"}
          statusFilterOptionArr={statusFilterOptionArr}
        />
      </li>
      {ShowPaymentStatus && (
        <li className="d-flex align-items-center flex-column gap-10">
          <label
            htmlFor=""
            className="form-label m-0 fw-sbold text-muted"
            style={{ whiteSpace: "nowrap" }}
          >
            Payment Status
          </label>
          <StatusFilter
            body={body}
            setBody={setBody}
            statusKey={"paymentStatus"}
            statusFilterOptionArr={paymentStatusOptions}
          />
        </li>
      )}
      {ShowSlotStatus && (
        <li className="d-flex align-items-center flex-column gap-10">
          <label
            htmlFor=""
            className="form-label m-0 fw-sbold text-muted"
            style={{ whiteSpace: "nowrap" }}
          >
            Slot Completed Status
          </label>
          <StatusFilter
            body={body}
            setBody={setBody}
            statusKey={"isSlotCompleted"}
            statusFilterOptionArr={slotCompletedStatusOptions}
          />
        </li>
      )}

      {showSearch && (
        <li className="">
          <SearchFilter
            body={body}
            setBody={setBody}
            searchHandler={searchHandler}
          />
        </li>
      )}
      <li>
        <Button className="commonBtn" type="button" onClick={clearFilter}>
          Clear
        </Button>
      </li>
    </ul>
  );
};

export default Filter;
