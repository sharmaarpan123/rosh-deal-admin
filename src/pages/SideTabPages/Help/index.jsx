import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import u1 from "../../../Assets/images/authBg.png";
import { Link } from "react-router-dom";
import { CstmPagination } from "../../../components/Common/Common";

const Help = () => {
  const column = [
    {
      head: "Sr. No.",
      accessor: "#",
      component: (item, key) => {
        return <>{key < 9 ? `0${key + 1}` : key + 1}</>;
      },
    },
    {
      head: "Platform User Type",
      accessor: "PlatformUser",
      component: (item, key, arr) => (
        <p className="m-0 fw-sbold">{item.PlatformUser}</p>
      ),
    },
    { head: "User Name", accessor: "UserName" },
    { head: "Email", accessor: "Email" },
    {
      head: "Created At",
      accessor: "createdAt",
      component: (item, key, arr) => <>{item.createdAt}</>,
    },

    {
      head: "Status",
      accessor: "status",
      component: (item, key, arr) => (
        <p
          className={`${
            item.status == "pending" ? "text-danger" : ""
          } m-0 fw-sbold text-capitalize`}
        >
          {item.status}
        </p>
      ),
    },
    {
      head: "Action",
      accessor: "Action",
      component: (item, key, arr) => (
        <div className="actionBtn d-flex align-items-center gap-10">
          <Link
            to="/help/detail"
            className="border-0 p-0"
            variant="transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="13"
              viewBox="0 0 21 13"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.1269 0.379883C6.00023 0.379883 2.81476 3.30125 1.26883 5.0114C0.614598 5.73509 0.23969 6.2714 0.23969 6.2714C0.0900251 6.48573 0.0900251 6.77233 0.23969 6.98666C0.23969 6.98666 0.534721 7.40936 1.05152 8.0024C2.50253 9.6674 5.79632 12.8782 10.1269 12.8782C14.572 12.8782 17.9291 9.49839 19.3181 7.87307C19.7642 7.35098 20.0152 6.98666 20.0152 6.98666C20.1649 6.77233 20.1649 6.48573 20.0152 6.2714C20.0152 6.2714 19.7398 5.87467 19.2535 5.31173C17.8276 3.6621 14.5055 0.379883 10.1269 0.379883ZM10.1269 1.62996C13.8634 1.62996 16.9827 4.59581 18.3074 6.12852C18.5725 6.43529 18.5974 6.48424 18.7089 6.63143C18.605 6.76803 18.593 6.79697 18.3671 7.06124C17.0781 8.56964 13.9201 11.6281 10.1269 11.6281C6.43137 11.6281 3.34181 8.72873 1.99268 7.18081C1.70294 6.8484 1.67185 6.78672 1.55443 6.63143C1.69037 6.45001 1.77636 6.31473 2.19543 5.85135C3.63536 4.25828 6.60534 1.62996 10.1269 1.62996ZM10.1269 2.88004C8.06297 2.88004 6.38027 4.56274 6.38027 6.62663C6.38027 8.69036 8.06297 10.378 10.1269 10.378C12.1906 10.378 13.8783 8.69036 13.8783 6.62663C13.8783 4.56274 12.1906 2.88004 10.1269 2.88004ZM10.1269 4.13127C11.5152 4.13127 12.6282 5.23814 12.6282 6.62663C12.6282 8.01496 11.5152 9.12794 10.1269 9.12794C8.73837 9.12794 7.6315 8.01496 7.6315 6.62663C7.6315 5.23814 8.73837 4.13127 10.1269 4.13127Z"
                fill="#645C5C"
              />
            </svg>
          </Link>
        </div>
      ),
    },
  ];
  const data = [
    {
      PlatformUser: "Business",
      UserName: "Kathryn Murphy",
      Email: "georgia.young@example.com",
      Phone: "(239) 555-0108",
      createdAt: "Feb 2, 2019 19:28",
      accountType: "Indivdual",
      status: "pending",
    },
    {
      PlatformUser: "Business",
      UserName: "Kathryn Murphy",
      Email: "georgia.young@example.com",
      Phone: "(239) 555-0108",
      createdAt: "Feb 2, 2019 19:28",
      accountType: "Indivdual",
      status: "ongoing",
    },
  ];
  return (
    <>
      <secstion className="help position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Help
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <div className="tableFilter d-flex align-items-center justify-content-between flex-wrap gap-10 mb-3">
                <div className="left">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="d-flex align-items-center gap-10">
                      <label
                        htmlFor=""
                        className="form-label m-0 fw-sbold text-muted"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Filter by Status
                      </label>
                      <Form.Select
                        className="select text-muted"
                        aria-label="Default select example"
                      >
                        <option>Active</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </li>
                    <li className="">
                      <div className="searchBox position-relative iconWithText">
                        <Button
                          className="border-0 p-0 position-absolute icn"
                          variant="transparent"
                          style={{ right: 10 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                          >
                            <path
                              d="M18.2462 17.225L13.1462 12.125C14.1212 10.925 14.7212 9.35 14.7212 7.625C14.7212 3.725 11.4962 0.5 7.59619 0.5C3.69619 0.5 0.471191 3.725 0.471191 7.625C0.471191 11.525 3.69619 14.75 7.59619 14.75C9.32119 14.75 10.8212 14.15 12.0962 13.175L17.1962 18.275C17.3462 18.425 17.5712 18.5 17.7212 18.5C17.8712 18.5 18.0962 18.425 18.2462 18.275C18.5462 17.975 18.5462 17.525 18.2462 17.225ZM7.59619 13.25C4.52119 13.25 1.97119 10.7 1.97119 7.625C1.97119 4.55 4.52119 2 7.59619 2C10.6712 2 13.2212 4.55 13.2212 7.625C13.2212 10.7 10.6712 13.25 7.59619 13.25Z"
                              fill="#C4C4C4"
                            />
                          </svg>
                        </Button>
                        <input
                          type="text"
                          placeholder="Search"
                          className="form-control"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <TableLayout column={column} data={data} />
              <CstmPagination />
            </Col>
          </Row>
        </Container>
      </secstion>
    </>
  );
};

export default Help;
