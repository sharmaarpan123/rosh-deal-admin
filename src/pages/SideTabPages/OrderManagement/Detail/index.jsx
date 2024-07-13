import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderDetail = () => {
  return (
    <>
      <section className="detail position-relative py-3">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/order-management"
                  className="border d-flex align-items-center p-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 10 16"
                    fill="none"
                  >
                    <path
                      d="M8.64707 0.473344C8.55514 0.381188 8.44594 0.308072 8.32572 0.258184C8.20549 0.208296 8.07661 0.182617 7.94644 0.182617C7.81628 0.182617 7.68739 0.208296 7.56717 0.258184C7.44694 0.308072 7.33774 0.381188 7.24582 0.473344L0.667065 7.05209C0.593675 7.12533 0.53545 7.21233 0.495723 7.3081C0.455996 7.40387 0.435547 7.50654 0.435547 7.61022C0.435547 7.7139 0.455996 7.81657 0.495723 7.91234C0.53545 8.00811 0.593675 8.0951 0.667065 8.16834L7.24582 14.7471C7.63373 15.135 8.25915 15.135 8.64707 14.7471C9.03498 14.3592 9.03498 13.7338 8.64707 13.3458L2.9154 7.60626L8.65498 1.86668C9.03498 1.48668 9.03498 0.853344 8.64707 0.473344Z"
                      fill="#1E232C"
                      stroke="#1E232C"
                      stroke-width="0.2"
                    />
                  </svg>
                </Link>
                <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                  Order Detail
                </h4>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <label
                htmlFor=""
                className="form-label m-0 pb-2 ps-2 fw-sbold text-muted"
              >
                User Details
              </label>
              <div
                className="cardCstm px-lg-4 px-3 py-2 rounded"
                style={{ background: "#eee" }}
              >
                <ul className="list-unstyled ps-0 mb-0 noLastBorder">
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Name:</p>
                    <p className="m-0 fw-sbold text-muted w-75">Theresa Webb</p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Phone Number:</p>
                    <p className="m-0 fw-sbold text-muted w-75">
                      (406) 555-0120
                    </p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Address:</p>
                    <p className="m-0 fw-sbold text-muted w-75">
                      3891 Ranchview Dr. Richardson, California 62639
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <label
                htmlFor=""
                className="form-label m-0 pb-2 ps-2 fw-sbold text-muted"
              >
                Service Provider Details
              </label>
              <div
                className="cardCstm px-lg-4 px-3 py-2 rounded"
                style={{ background: "#eee" }}
              >
                <ul className="list-unstyled ps-0 mb-0 noLastBorder">
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Name:</p>
                    <p className="m-0 fw-sbold text-muted w-75">Arlene McCoy</p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Email:</p>
                    <p className="m-0 fw-sbold text-muted w-75">
                      debra.holt@example.com
                    </p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Phone Number:</p>
                    <p className="m-0 fw-sbold text-muted w-75">
                      (406) 555-0120
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <label
                htmlFor=""
                className="form-label m-0 pb-2 ps-2 fw-sbold text-muted"
              >
                Order Details
              </label>
              <div
                className="cardCstm px-lg-4 px-3 py-2 rounded"
                style={{ background: "#eee" }}
              >
                <ul className="list-unstyled ps-0 mb-0 noLastBorder">
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Service Type:</p>
                    <p className="m-0 fw-sbold text-muted w-75">Laundry</p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">
                      Number of Items:
                    </p>
                    <p className="m-0 fw-sbold text-muted w-75">20</p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Total Weigh:</p>
                    <p className="m-0 fw-sbold text-muted w-75">1kg</p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Total Price:</p>
                    <p className="m-0 fw-sbold text-muted w-75">$50.00</p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <label
                htmlFor=""
                className="form-label m-0 pb-2 ps-2 fw-sbold text-muted"
              >
                Other Details
              </label>
              <div
                className="cardCstm px-lg-4 px-3 py-2 rounded"
                style={{ background: "#eee" }}
              >
                <ul className="list-unstyled ps-0 mb-0 noLastBorder">
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Scheduled at:</p>
                    <p className="m-0 fw-sbold text-muted w-75">
                      Feb 2, 2024 19:28
                    </p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Delivery at:</p>
                    <p className="m-0 fw-sbold text-muted w-75">
                      Feb 6, 2024 19:28
                    </p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Created at:</p>
                    <p className="m-0 fw-sbold text-muted w-75">
                      Feb 1, 2024 19:28
                    </p>
                  </li>
                  <li className="py-2 d-flex align-items-start">
                    <p className="m-0 fw-sbold themeClr w-25">Status:</p>
                    <p className="m-0 fw-sbold text-muted w-75">Pending</p>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default OrderDetail;
