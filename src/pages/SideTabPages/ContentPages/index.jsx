import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableLayout from "../../../components/TableLayout";
import { CstmPagination } from "../../../components/Common/Common";
import ConfirmationPop from "../../../components/Modals/ConfirmationPop";

const ContentPage = () => {
  const column = [
    {
      head: "Sr. no.",
      accessor: "srNo",
      component: (item, key) => {
        return <>{key < 9 ? `0${key + 1}` : key + 1}</>;
      },
    },
    { head: "Pages", accessor: "pages" },
    {
      head: "Status",
      accessor: "",
      isComponent: true,
      component: (item, ind) => (
        <Form.Check
          type="switch"
          accessor="custom-switch"
          checked={item.status == "active" ? true : false}
          onClick={() => statusChangeHandler(item, ind)}
        />
      ),
    },
    {
      head: "Created At",
      accessor: "createdAt",
      classNames: "fw-sbold",
      isComponent: true,
      component: (item) => <p className={` m-0`}>12 feb 2022</p>,
    },
    {
      head: "Actions",
      accessor: "",
      isComponent: true,
      component: (item) => (
        <div className="ActnBtn d-flex align-items-center  gap-10">
          <Link
            className="border-0 p-0"
            variant="transparent"
            to={`/content-page/add`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              waccessorth="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clip-path="url(#clip0_0_6432)">
                <path
                  d="M3.23958 15.1556C3.41958 15.1556 3.45558 15.1376 3.61758 15.1016L6.85758 14.4536C7.19958 14.3636 7.54158 14.2016 7.81158 13.9316L15.6596 6.08362C16.8656 4.87762 16.8656 2.80762 15.6596 1.60162L14.9936 0.899617C13.7876 -0.306383 11.6996 -0.306383 10.4936 0.899617L2.64558 8.76562C2.39358 9.01762 2.21358 9.37762 2.12358 9.71962L1.43958 12.9956C1.34958 13.6076 1.52958 14.2016 1.96158 14.6336C2.30358 14.9756 2.80758 15.1556 3.23958 15.1556ZM3.85158 10.0616L11.6996 2.19562C12.2216 1.67362 13.1756 1.67362 13.6796 2.19562L14.3636 2.87962C14.9756 3.49162 14.9756 4.35562 14.3636 4.94962L6.53358 12.8156L3.20358 13.3736L3.85158 10.0616ZM15.5876 16.2716H2.30358C1.78158 16.2716 1.43958 16.6136 1.43958 17.1356C1.43958 17.6576 1.87158 17.9996 2.30358 17.9996H15.5156C16.0376 17.9996 16.4696 17.6576 16.4696 17.1356C16.4516 16.6136 16.0196 16.2716 15.5876 16.2716Z"
                  fill="#27AE60"
                  stroke="#F8FAFC"
                  stroke-waccessorth="0.3"
                />
              </g>
              <defs>
                <clipPath accessor="clip0_0_6432">
                  <rect waccessorth="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Button
            onClick={handleConfirmation}
            className="border-0 p-0"
            variant="transparent"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              waccessorth="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
            >
              <g clip-path="url(#clip0_0_6390)">
                <path
                  d="M10.1875 13.8438C10.3533 13.8438 10.5122 13.7779 10.6294 13.6607C10.7467 13.5435 10.8125 13.3845 10.8125 13.2188V6.96875C10.8125 6.80299 10.7467 6.64402 10.6294 6.52681C10.5122 6.4096 10.3533 6.34375 10.1875 6.34375C10.0217 6.34375 9.86277 6.4096 9.74556 6.52681C9.62835 6.64402 9.5625 6.80299 9.5625 6.96875V13.2188C9.5625 13.3845 9.62835 13.5435 9.74556 13.6607C9.86277 13.7779 10.0217 13.8438 10.1875 13.8438ZM5.8125 13.8438C5.97826 13.8438 6.13723 13.7779 6.25444 13.6607C6.37165 13.5435 6.4375 13.3845 6.4375 13.2188V6.96875C6.4375 6.80299 6.37165 6.64402 6.25444 6.52681C6.13723 6.4096 5.97826 6.34375 5.8125 6.34375C5.64674 6.34375 5.48777 6.4096 5.37056 6.52681C5.25335 6.64402 5.1875 6.80299 5.1875 6.96875V13.2188C5.1875 13.3845 5.25335 13.5435 5.37056 13.6607C5.48777 13.7779 5.64674 13.8438 5.8125 13.8438ZM10.5 1.65625C10.6658 1.65625 10.8247 1.5904 10.9419 1.47319C11.0592 1.35598 11.125 1.19701 11.125 1.03125C11.125 0.86549 11.0592 0.706518 10.9419 0.589308C10.8247 0.472098 10.6658 0.40625 10.5 0.40625H5.5C5.33424 0.40625 5.17527 0.472098 5.05806 0.589308C4.94085 0.706518 4.875 0.86549 4.875 1.03125C4.875 1.19701 4.94085 1.35598 5.05806 1.47319C5.17527 1.5904 5.33424 1.65625 5.5 1.65625H10.5Z"
                  fill="#EB5757"
                />
                <path
                  d="M1.125 2.28125C0.95924 2.28125 0.800269 2.3471 0.683058 2.46431C0.565848 2.58152 0.5 2.74049 0.5 2.90625C0.5 3.07201 0.565848 3.23098 0.683058 3.34819C0.800269 3.4654 0.95924 3.53125 1.125 3.53125H1.75V15.0312C1.75 16.4437 2.9 17.5938 4.3125 17.5938H11.6875C13.1 17.5938 14.25 16.4437 14.25 15.0312V3.53125H14.875C15.0408 3.53125 15.1997 3.4654 15.3169 3.34819C15.4342 3.23098 15.5 3.07201 15.5 2.90625C15.5 2.74049 15.4342 2.58152 15.3169 2.46431C15.1997 2.3471 15.0408 2.28125 14.875 2.28125H2.375H1.125ZM13 3.53125V15.0312C13 15.3793 12.8617 15.7132 12.6156 15.9593C12.3694 16.2055 12.0356 16.3438 11.6875 16.3438H4.3125C3.9644 16.3438 3.63056 16.2055 3.38442 15.9593C3.13828 15.7132 3 15.3793 3 15.0312V3.53125H13Z"
                  fill="#EB5757"
                />
              </g>
              <defs>
                <clipPath accessor="clip0_0_6390">
                  <rect waccessorth="16" height="18" fill="white" />
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
      pages: "About us",
      status: "active",
      CreatedAt: "Dec 7, 2019 23:26",
    },
    {
      pages: "Privacy Policy",
      status: "inactive",
      CreatedAt: "Dec 7, 2019 23:26",
    },
    {
      pages: "terms condition",
      status: "inactive",
      CreatedAt: "Dec 7, 2019 23:26",
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
      <section className="contentPage py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Content Page Managment
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
                        to={"/content-page/add"}
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
              <TableLayout data={data} column={column} />
              <CstmPagination />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContentPage;
