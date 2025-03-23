import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

// img
import i1 from "../../../../Assets/images/authBg.jpeg";
import user from "../../../../Assets/images/user.png";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";
import {
  SERVICE_PROVIDER_VIEW,
  STATUS_CHANGE_SERVICE_PROVIDER,
} from "../../../../services/ApiCalls";
import moment from "moment";

const ServiceProviderDetail = () => {
  const [userDetails, setUserUserDetails] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const getData = catchAsync(async () => {
    const res = await SERVICE_PROVIDER_VIEW(id);
    checkResponse({ res, setData: setUserUserDetails });
  });

  useEffect(() => {
    if (id) getData();
  }, [id]);

  const acceptRejectHandler = catchAsync(async (status) => {
    const res = await STATUS_CHANGE_SERVICE_PROVIDER({ _id: id, status });

    const success = checkResponse({
      res,
    });

    if (success) {
      navigate("/service-provider/register");
    }
  });

  return (
    <>
      <section className="py-3 position-relative providerDetail">
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/service-provider/register"
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
                  Register Service Providers
                </h4>
              </div>
            </Col>
            <Col lg="12" className="my-2">
              <div
                className="formWrpper rounded"
                style={{ background: "#EEEEEE" }}
              >
                <div className="coverImg" style={{ marginBottom: -100 }}>
                  <div className="mx-auto position-relative upload text-center">
                    <div className="imgWrp position-relative">
                      <img
                        style={{ height: 140 }}
                        src={i1}
                        alt=""
                        className="img-fluid object-fit-cover w-100 rounded"
                      />
                    </div>
                  </div>
                </div>
                <Row className="justify-content-between px-lg-5 p-md-4 p-3 position-relative">
                  <Col lg="12" className="my-2">
                    <div
                      className="imgWrp text-center mx-auto"
                      style={{ maxWidth: "max-content" }}
                    >
                      <img
                        src={userDetails?.profileImage?.link || user}
                        style={{ height: 140, width: 140 }}
                        alt=""
                        className="img-fluid rounded-circle object-fit-cover"
                      />
                    </div>
                    {/* <div className="text-end">
                      <div className="d-inline-flex align-items-center gap-10">
                        <label
                          htmlFor=""
                          className="form-label m-0 text-muted fw-sbold"
                        >
                          Status
                        </label>
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          checked
                        />
                      </div>
                    </div> */}
                  </Col>
                  <Col md={6} className="my-2">
                    <ul className="list-unstyled ps-0 mb-0 notLastBorder pe-lg-3">
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">
                          Full Name:
                        </p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          {userDetails?.name}
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">
                          Account Type:
                        </p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          {userDetails?.accountType}
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">Email:</p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          {userDetails?.email}
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">Address:</p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          {userDetails?.address}
                        </h6>
                      </li>
                    </ul>
                  </Col>
                  <Col md={6} className="my-2">
                    <ul className="list-unstyled mb-0 notLastBorder ps-lg-3">
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">
                          Phone Number:
                        </p>
                        <p className="m-0 text-muted fw-bold w-50">
                          {userDetails?.mobileNumber}
                        </p>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">
                          Created at:
                        </p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          {moment(userDetails?.date_created_utc).format(
                            "DD-MM-YYYY  hh:mm:ss A"
                          )}
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">Status:</p>
                        <h6 className="m-0 text-muted fw-bold w-50">
                          {userDetails?.status}
                        </h6>
                      </li>
                    </ul>
                  </Col>
                  {userDetails?.status === "created" && (
                    <Col lg="12" className="my-2">
                      <div className="d-flex align-items-center justify-content-center gap-10 pt-4">
                        <Button
                          className="d-flex align-items-center justify-content-center commonBtn GreyBtn"
                          type="button"
                          onClick={acceptRejectHandler("rejected")}
                        >
                          Reject
                        </Button>
                        <Button
                          className="d-flex align-items-center justify-content-center commonBtn "
                          type="button"
                          onClick={acceptRejectHandler("approved")}
                        >
                          Accept
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ServiceProviderDetail;
