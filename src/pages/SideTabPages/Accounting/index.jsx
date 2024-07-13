import React, { useState } from "react";
import { Button, Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";
import TableLayout from "../../../components/TableLayout";
import { CstmPagination } from "../../../components/Common/Common";
import { Link } from "react-router-dom";

const Accounting = () => {
  const column = [
    {
      head: "Sr. No.",
      accessor: "#",
      component: (item, key) => {
        return <>{key < 9 ? `0${key + 1}` : key + 1}</>;
      },
    },
    { head: "Time", accessor: "Time" },
    {
      head: "Type",
      accessor: "Type",
    },
    { head: "Amount", accessor: "Amount" },
    { head: "Earning", accessor: "Earning" },
    { head: "Description", accessor: "Description" },
    {
      head: "Action",
      accessor: "Action",
      component: (item, key, arr) => (
        <div className="actionBtn d-flex align-items-center gap-10">
          <Button
            onClick={handleConfirmation}
            className="border-0 p-0"
            variant="transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
            >
              <g clip-path="url(#clip0_0_1356)">
                <path
                  d="M10.3149 14.4727C10.4807 14.4727 10.6397 14.4068 10.7569 14.2896C10.8741 14.1724 10.9399 14.0134 10.9399 13.8477V7.59766C10.9399 7.4319 10.8741 7.27292 10.7569 7.15571C10.6397 7.0385 10.4807 6.97266 10.3149 6.97266C10.1492 6.97266 9.99021 7.0385 9.873 7.15571C9.75579 7.27292 9.68994 7.4319 9.68994 7.59766V13.8477C9.68994 14.0134 9.75579 14.1724 9.873 14.2896C9.99021 14.4068 10.1492 14.4727 10.3149 14.4727ZM5.93994 14.4727C6.1057 14.4727 6.26467 14.4068 6.38188 14.2896C6.49909 14.1724 6.56494 14.0134 6.56494 13.8477V7.59766C6.56494 7.4319 6.49909 7.27292 6.38188 7.15571C6.26467 7.0385 6.1057 6.97266 5.93994 6.97266C5.77418 6.97266 5.61521 7.0385 5.498 7.15571C5.38079 7.27292 5.31494 7.4319 5.31494 7.59766V13.8477C5.31494 14.0134 5.38079 14.1724 5.498 14.2896C5.61521 14.4068 5.77418 14.4727 5.93994 14.4727ZM10.6274 2.28516C10.7932 2.28516 10.9522 2.21931 11.0694 2.1021C11.1866 1.98489 11.2524 1.82592 11.2524 1.66016C11.2524 1.4944 11.1866 1.33542 11.0694 1.21821C10.9522 1.101 10.7932 1.03516 10.6274 1.03516H5.62744C5.46168 1.03516 5.30271 1.101 5.1855 1.21821C5.06829 1.33542 5.00244 1.4944 5.00244 1.66016C5.00244 1.82592 5.06829 1.98489 5.1855 2.1021C5.30271 2.21931 5.46168 2.28516 5.62744 2.28516H10.6274Z"
                  fill="#EB5757"
                />
                <path
                  d="M1.25244 2.91016C1.08668 2.91016 0.92771 2.976 0.8105 3.09321C0.69329 3.21042 0.627441 3.3694 0.627441 3.53516C0.627441 3.70092 0.69329 3.85989 0.8105 3.9771C0.92771 4.09431 1.08668 4.16016 1.25244 4.16016H1.87744V15.6602C1.87744 17.0727 3.02744 18.2227 4.43994 18.2227H11.8149C13.2274 18.2227 14.3774 17.0727 14.3774 15.6602V4.16016H15.0024C15.1682 4.16016 15.3272 4.09431 15.4444 3.9771C15.5616 3.85989 15.6274 3.70092 15.6274 3.53516C15.6274 3.3694 15.5616 3.21042 15.4444 3.09321C15.3272 2.976 15.1682 2.91016 15.0024 2.91016H2.50244H1.25244ZM13.1274 4.16016V15.6602C13.1274 16.0083 12.9892 16.3421 12.743 16.5882C12.4969 16.8344 12.163 16.9727 11.8149 16.9727H4.43994C4.09185 16.9727 3.75801 16.8344 3.51186 16.5882C3.26572 16.3421 3.12744 16.0083 3.12744 15.6602V4.16016H13.1274Z"
                  fill="#EB5757"
                />
              </g>
              <defs>
                <clipPath id="clip0_0_1356">
                  <rect
                    width="16"
                    height="18"
                    fill="white"
                    transform="translate(0.127441 0.628906)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </div>
      ),
    },
  ];
  const data = [
    {
      Time: "Dec 4, 2019 21:42",
      Type: "Iron and washing",
      Amount: "$20.00",
      Earning: "$5.00",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    },
    {
      Time: "Dec 4, 2019 21:42",
      Type: "Iron and washing",
      Amount: "$20.00",
      Earning: "$5.00",
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    },
  ];
  const [confirmation, setConfirmation] = useState();
  const handleConfirmation = () => setConfirmation(!confirmation);

  return (
    <>
      <ConfirmationPop
        confirmation={confirmation}
        setConfirmation={setConfirmation}
      />
      <section className="accounting py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Accounting
              </h4>
            </Col>
            <Col lg="12" className="my-2">
              <Tab.Container id="left-tabs-example" defaultActiveKey="Admin">
                <div className="d-flex align-items-center justify-content-between gap-10 flex-wrap">
                  <Nav
                    variant="pills"
                    className="inline-flex rounded-pill pillsTab"
                    style={{ background: "#033E8A", maxWidth: "max-content" }}
                  >
                    <Nav.Item>
                      <Nav.Link
                        className="rounded-pill d-flex align-items-center justify-content-center position-relative"
                        eventKey="Admin"
                      >
                        Admin Transactions
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        className="rounded-pill d-flex align-items-center justify-content-center position-relative"
                        eventKey="Withdrawal"
                      >
                        Withdrawal transaction
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <div className="right">
                    <ul className="list-unstyled ps-0 mb-0 d-flex align-items-end gap-10 flex-wrap">
                      <li className="d-flex align-items-end gap-10 flex-wrap">
                        <label
                          style={{ whiteSpace: "nowrap" }}
                          htmlFor=""
                          className="form-label m-0 fw-sbold text-muted pb-2"
                        >
                          Select Date Range
                        </label>
                        <div className="d-flex align-items-center gap-10">
                          <div className="">
                            <p className="m-0 fw-sbold themeBlue">From</p>
                            <input
                              type="date"
                              className="form-control"
                              style={{
                                height: 40,
                                fontSize: 12,
                                background: "#F9F9F9",
                              }}
                            />
                          </div>
                          <div className="">
                            <p className="m-0 fw-sbold themeBlue">To</p>
                            <input
                              type="date"
                              style={{
                                height: 40,
                                fontSize: 12,
                                background: "#F9F9F9",
                              }}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <Button
                          className="d-flex align-items-center justify-content-center fw-sbold commonBtn GreyBtn"
                          style={{ height: 40, minWidth: 100, fontSize: 12 }}
                        >
                          Export CSV
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="my-2 pt-3">
                  <TableLayout column={column} data={data} />
                  <CstmPagination />
                </div>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Accounting;
