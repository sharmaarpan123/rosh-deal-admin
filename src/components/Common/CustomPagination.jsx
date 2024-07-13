import React from "react";
import { Form } from "react-bootstrap";
import styles from "./common.module.scss";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { paginationLimitArr } from "../../utilities/const";

const CustomPagination = ({ total, pageChangeHandler, body, setBody }) => {
  if (!total) {
    return <></>;
  }
  return (
    <>
      <div
        className={`${styles.cstmPagination} cstmPagination d-flex align-items-center justify-content-between gap-10`}
      >
        <div className="left d-flex align-items-center gap-10">
          <p className="m-0" style={{ whiteSpace: "nowrap" }}>
            Show result:{" "}
          </p>
          <Form.Select
            className="fw-bold text-dark"
            aria-label="Default select example"
            defaultValue={body?.limit}
            onChange={(e) => {
              setBody((p) => ({
                ...p,
                limit: +e.target.value,
                offset: 0,
              }));
            }}
          >
            {paginationLimitArr.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </Form.Select>
        </div>

        <div className="right d-flex align-items-center gap-10">
          <p className="m-0 fw-sbold text-dark">
            {body?.page * body?.limit - body?.limit + 1}-{total} of items
          </p>
          <Pagination
            total={total}
            pageSize={body.limit}
            current={body.page}
            onChange={pageChangeHandler}
          />
        </div>
      </div>
    </>
  );
};

export default CustomPagination;
