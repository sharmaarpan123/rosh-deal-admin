import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import TableLayout from "../../../components/TableLayout";

// img
import u1 from "../../../Assets/images/authBg.png";
import { Link } from "react-router-dom";
import { CstmPagination } from "../../../components/Common/Common";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";

const PlatForm = () => {
  const column = [
    {
      head: "Sr. No.",
      accessor: "#",
      component: (item, key) => {
        return <>{key < 9 ? `0${key + 1}` : key + 1}</>;
      },
    },
    {
      head: "Name",
      accessor: "Name",
      component: (item, key, arr) => (
        <p className="m-0 fw-sbold">{item.Name}</p>
      ),
    },
    { head: "Email", accessor: "Email" },
    {
      head: "Created At",
      accessor: "createdAt",
    },
    {
      head: "Last Modified",
      accessor: "LastModified",
    },
    {
      head: "Roles",
      accessor: "Roles",
      component: (item, key, arr) => (
        <p className={`text-danger m-0 fw-sbold text-capitalize`}>
          {item.Roles}
        </p>
      ),
    },
    {
      head: "Status",
      accessor: "status",
      component: (item, key, arr) => (
        <Form.Check 
          type="switch"
          id="custom-switch"
          checked={!item.isDeleted}
        />
      ),
    },
    {
      head: "Action",
      accessor: "Action",
      component: (item, key, arr) => (
        <div className="actionBtn d-flex align-items-center gap-10">
          <Link to="/system-access/add" className="border-0 p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 19 19"
              fill="none"
            >
              <g clip-path="url(#clip0_0_1398)">
                <path
                  d="M3.36751 15.785C3.54751 15.785 3.58351 15.767 3.74551 15.731L6.98551 15.083C7.32751 14.993 7.66951 14.831 7.93951 14.561L15.7875 6.71301C16.9935 5.50701 16.9935 3.43701 15.7875 2.23101L15.1215 1.52901C13.9155 0.323012 11.8275 0.323012 10.6215 1.52901L2.77351 9.39501C2.52151 9.64701 2.34151 10.007 2.25151 10.349L1.56751 13.625C1.47751 14.237 1.65751 14.831 2.08951 15.263C2.43151 15.605 2.93551 15.785 3.36751 15.785ZM3.97951 10.691L11.8275 2.82501C12.3495 2.30301 13.3035 2.30301 13.8075 2.82501L14.4915 3.50901C15.1035 4.12101 15.1035 4.98501 14.4915 5.57901L6.66151 13.445L3.33151 14.003L3.97951 10.691ZM15.7155 16.901H2.43151C1.90951 16.901 1.56751 17.243 1.56751 17.765C1.56751 18.287 1.99951 18.629 2.43151 18.629H15.6435C16.1655 18.629 16.5975 18.287 16.5975 17.765C16.5795 17.243 16.1475 16.901 15.7155 16.901Z"
                  fill="#27AE60"
                  stroke="#F8FAFC"
                  stroke-width="0.3"
                />
              </g>
              <defs>
                <clipPath id="clip0_0_1398">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(0.127441 0.628906)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
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
      Name: "Jenny Wilson",
      Email: "georgia.young@example.com",
      createdAt: "Feb 2, 2019 19:28",
      LastModified: "Feb 2, 2019 19:28",
      Roles: "sub admin",
      status: "active",
    },
    {
      Name: "Jenny Wilson",
      Email: "georgia.young@example.com",
      createdAt: "Feb 2, 2019 19:28",
      LastModified: "Feb 2, 2019 19:28",
      Roles: "sub admin",
      status: "inactive",
    },
  ];
  const [confirmation, setConfirmation] = useState();
  const handleConfirmation = () => setConfirmation(!confirmation);
  return (
    <>
      <ConfirmationPop
        type={"delete"}
        confirmation={confirmation}
        setConfirmation={setConfirmation}
      />
      <section className="systemAcess py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Sub Admin
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
                <div className="right">
                  <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10 flex-wrap">
                    <li className="">
                      <Link
                        to={"/system-access/add"}
                        className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn"
                        style={{ height: 40, minWidth: 100, fontSize: 12 }}
                      >
                        Add New
                      </Link>
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
      </section>
    </>
  );
};

export default PlatForm;
