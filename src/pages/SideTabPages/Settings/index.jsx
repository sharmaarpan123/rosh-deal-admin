import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

// img
import i1 from "../../../Assets/images/authBg.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Settings = () => {
  const { admin } = useSelector((s) => s.login);

  return (
    <>
      <section className="setting position-relative py-3">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <h4 className="mb-0 py-3 fw-bold themeBlue text-capitalize">
                Admin Profile
              </h4>
            </Col>
            <Col lg="7" md="9" sm="11" className="my-2">
              <div
                className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                style={{ background: "#EEEEEE" }}
              >
                <Row className="justify-content-between">
                  <Col md={12} className="my-2">
                    <ul className="list-unstyled ps-0 mb-0 notLastBorder pe-lg-3">
                      <li className="py-3 border-0">
                        <div className="text-center">
                          <img
                            src={i1}
                            alt=""
                            style={{
                              height: 100,
                              width: 100,
                              border: "2px solid #ADADAD",
                            }}
                            className="img-fluid rounded-circle object-fit-cover"
                          />
                        </div>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">Name:</p>
                        <h6 className="m-0 text-muted fw-bold w-75">
                          {admin?.name}
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">
                          Phone Number:
                        </p>
                        <h6 className="m-0 text-muted fw-bold w-75">
                          +91 {admin?.phoneNumber}
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">Email:</p>
                        <h6 className="m-0 text-muted fw-bold w-75">
                          {admin?.email}
                        </h6>
                      </li>
                      <li className="py-3 d-flex align-items-center gap-10">
                        <p className="m-0 themeBlue fw-sbold w-25">UserName:</p>
                        <h6 className="m-0 text-muted fw-bold w-75">
                          {admin?.userName}
                        </h6>
                      </li>
                    </ul>
                    <div className="btnWrpper my-3 d-flex align-items-center justify-content-center gap-10 pt-5">
                      {/* <Link
                        // to="/settings/password"
                        to={"#"}
                        onClick={(e) => {
                          e.preventDefault();
                          toast.dismiss();
                          toast.warning(
                            "This feature is in dev mode still you can forget your password by logout other wise you can contact your admin or super admin "
                          );
                        }}
                        className="d-flex btn btn-primary align-items-center justify-content-center commonBtn GreyBtn"
                      >
                        Manage Password
                      </Link>
                      <Link
                        // to="/settings/edit-profile"
                        to={"#"}
                        onClick={(e) => {
                          e.preventDefault();
                          toast.dismiss();
                          toast.warning("This feature is in development");
                        }}
                        className="d-flex btn btn-primary align-items-center justify-content-center commonBtn"
                      >
                        Edit Profile
                      </Link> */}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Settings;
