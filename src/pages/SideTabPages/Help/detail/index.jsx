import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const HelpDetail = () => {
  return (
    <>
      <section className="helpDetail py-3 position-relative">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/help"
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
                  Help
                </h4>
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <div
                className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                style={{ background: "#EEEEEE" }}
              >
                <Row className="justify-content-between">
                  <Col md={6} className="my-2">
                    <ul className="list-unstyled ps-0 mb-0 notLastBorder pe-lg-3">
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-50">
                          Platform User Type:
                        </p>
                        <h6 className="m-0 text-muted fw-bold w-50">Devon</h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-50">Email:</p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          nevaeh.simmons@example.com
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-50">
                          Phone Number:
                        </p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          (217) 555-0113
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-50">Status</p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          Completed
                        </h6>
                      </li>
                    </ul>
                  </Col>
                  <Col md={6} className="my-2">
                    <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-50">
                          User Name:
                        </p>
                        <p className="m-0 text-muted fw-bold w-50">Charlie</p>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-50">Title:</p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          Starting your traveling blog
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-start gap-10">
                        <p className="m-0 themeBlue fw-sbold w-50">
                          {" "}
                          Description:
                        </p>
                        <p
                          className="m-0 text-muted w-50"
                          style={{ fontSize: 12, lineHeight: "18px" }}
                        >
                          Lorem ipsum dolor sit amet consectetur. Malesuada
                          pellentesque mi mi tortor ultrices facilisi cursus.
                          Urna sit arcu at pellentesque sed pretium. Convallis
                          viverra elit sed pellentesque elementum lectus proin.
                          Tristique pretium nec ante nunc nullam ut vitae. Nisi
                          at ut turpis dui. Lobortis enim non nullam tortor
                          morbi in.
                        </p>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <ul className="list-unstyled ps-0 mb-0 notLastBorder pe-lg-3">
                <li className="py-3 d-flex align-items-start gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Add Comment:</p>
                  <p
                    class="m-0 text-muted w-75"
                    style={{ fontSize: 12, lineHeight: "18px" }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Malesuada
                    pellentesque mi mi tortor ultrices facilisi cursus. Urna sit
                    arcu at pellentesque sed pretium. Convallis viverra elit sed
                    pellentesque elementum lectus proin. Tristique pretium nec
                    ante nunc nullam ut vitae. Nisi at ut turpis dui. Lobortis
                    enim non nullam tortor morbi in.
                  </p>
                </li>
              </ul>
            </Col>
            <Col lg="6" className="my-2">
              <ul className="list-unstyled ps-0 mb-0 notLastBorder pe-lg-3">
                <li className="py-3 d-flex align-items-start gap-10">
                  <p className="m-0 themeBlue fw-sbold w-25">Mark Status as:</p>
                  <p
                    class="m-0 text-muted w-75"
                    style={{ fontSize: 12, lineHeight: "18px" }}
                  >
                    <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10">
                      <li className="d-flex align-items-center gap-10">
                        <input
                          name="status"
                          type="radio"
                          id="Ongoing"
                          className="form-check"
                        />
                        <label
                          htmlFor="Ongoing"
                          className="form-label m-0 fw-sbold text-muted"
                        >
                          Ongoing
                        </label>
                      </li>
                      <li className="d-flex align-items-center gap-10">
                        <input
                          name="status"
                          type="radio"
                          id="Pending"
                          className="form-check"
                        />
                        <label
                          htmlFor="Pending"
                          className="form-label m-0 fw-sbold text-muted"
                        >
                          Pending
                        </label>
                      </li>
                    </ul>
                  </p>
                </li>
              </ul>
            </Col>
            <Col lg="12" className="my-2">
              <div className="text-center mt-3">
                <Button className="d-inline-flex align-items-center justify-content-center commonBtn">
                  Send
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HelpDetail;
