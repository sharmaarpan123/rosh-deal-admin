import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

// css
import styles from "../../../layout/Auth/Auth.module.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState();
  const handlePass = () => {
    setPass(!pass);
  };
  return (
    <>
      <div className="formInner position-relative px-lg-3">
        <div className="w-100 inner">
          <div className="top py-2">
            <div className="d-flex align-items-center gap-10">
              <Link
                to="/forgot-password"
                className="d-inline-flex align-items-center justify-content-center border py-2  broder-light btn "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M13.1578 2.3669C13.0659 2.27474 12.9567 2.20163 12.8365 2.15174C12.7162 2.10185 12.5873 2.07617 12.4572 2.07617C12.327 2.07617 12.1981 2.10185 12.0779 2.15174C11.9577 2.20163 11.8485 2.27474 11.7566 2.3669L5.17781 8.94565C5.10442 9.01889 5.04619 9.10588 5.00646 9.20165C4.96674 9.29743 4.94629 9.40009 4.94629 9.50377C4.94629 9.60746 4.96674 9.71012 5.00646 9.80589C5.04619 9.90166 5.10442 9.98866 5.17781 10.0619L11.7566 16.6406C12.1445 17.0286 12.7699 17.0286 13.1578 16.6406C13.5457 16.2527 13.5457 15.6273 13.1578 15.2394L7.42614 9.49982L13.1657 3.76023C13.5457 3.38023 13.5457 2.7469 13.1578 2.3669Z"
                    fill="#1E232C"
                    stroke="#1E232C"
                    stroke-width="0.2"
                  />
                </svg>
              </Link>
              <h4 className="m-0 fw-sbold themeClr">Reset Password</h4>
            </div>
          </div>
          <Form className={`${styles.form} pt-lg-4 pt-2`}>
            <Row className="justify-content-center">
              <Col lg="12" className="my-2">
                <label
                  htmlFor=""
                  className="form-label m-0 pb-1 themeClr fw-sbold"
                >
                  New Password
                </label>
                <div className="position-relative iconWithText">
                  <input
                    type={pass ? "text" : "password"}
                    className={`${styles.formControl} form-control`}
                    placeholder="*************"
                  />
                  <Button
                    onClick={handlePass}
                    className="border-0 p-0 position-absolute icn"
                    variant="transparent"
                    style={{ right: 10 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                    >
                      <path
                        d="M8.96236 5.23432C8.96236 5.60618 8.8521 5.96968 8.64551 6.27886C8.43892 6.58804 8.14529 6.82902 7.80174 6.97132C7.4582 7.11362 7.08017 7.15085 6.71546 7.07831C6.35076 7.00576 6.01576 6.8267 5.75282 6.56376C5.48988 6.30082 5.31082 5.96582 5.23827 5.60112C5.16573 5.23641 5.20296 4.85838 5.34526 4.51484C5.48756 4.17129 5.72854 3.87766 6.03772 3.67107C6.34691 3.46448 6.71041 3.35422 7.08226 3.35422C7.58089 3.35422 8.0591 3.5523 8.41169 3.90489C8.76428 4.25748 8.96236 4.73569 8.96236 5.23432ZM13.8945 5.54768C13.7817 5.73569 11.1621 10.2479 7.08226 10.2479C3.00242 10.2479 0.382804 5.73569 0.269997 5.54768C0.214993 5.45241 0.186035 5.34433 0.186035 5.23432C0.186035 5.12432 0.214993 5.01624 0.269997 4.92097C0.382804 4.73296 3.00242 0.220703 7.08226 0.220703C11.1621 0.220703 13.7817 4.73296 13.8945 4.92097C13.9495 5.01624 13.9785 5.12432 13.9785 5.23432C13.9785 5.34433 13.9495 5.45241 13.8945 5.54768ZM10.2158 5.23432C10.2158 4.61457 10.032 4.00874 9.68768 3.49344C9.34336 2.97813 8.85397 2.5765 8.2814 2.33934C7.70882 2.10217 7.07878 2.04011 6.47094 2.16102C5.8631 2.28193 5.30476 2.58037 4.86653 3.0186C4.4283 3.45683 4.12986 4.01516 4.00895 4.62301C3.88804 5.23085 3.9501 5.86089 4.18727 6.43347C4.42443 7.00604 4.82607 7.49543 5.34137 7.83975C5.85667 8.18406 6.46251 8.36784 7.08226 8.36784C7.91331 8.36784 8.71034 8.0377 9.29798 7.45005C9.88563 6.86241 10.2158 6.06538 10.2158 5.23432Z"
                        fill="#B1B1B1"
                      />
                    </svg>
                  </Button>
                </div>
              </Col>
              <Col lg="12" className="my-2">
                <label
                  htmlFor=""
                  className="form-label m-0 pb-1 themeClr fw-sbold"
                >
                  Confirm Password
                </label>
                <div className="position-relative iconWithText">
                  <input
                    type={pass ? "text" : "password"}
                    className={`${styles.formControl} form-control`}
                    placeholder="*************"
                  />
                  <Button
                    onClick={handlePass}
                    className="border-0 p-0 position-absolute icn"
                    variant="transparent"
                    style={{ right: 10 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                    >
                      <path
                        d="M8.96236 5.23432C8.96236 5.60618 8.8521 5.96968 8.64551 6.27886C8.43892 6.58804 8.14529 6.82902 7.80174 6.97132C7.4582 7.11362 7.08017 7.15085 6.71546 7.07831C6.35076 7.00576 6.01576 6.8267 5.75282 6.56376C5.48988 6.30082 5.31082 5.96582 5.23827 5.60112C5.16573 5.23641 5.20296 4.85838 5.34526 4.51484C5.48756 4.17129 5.72854 3.87766 6.03772 3.67107C6.34691 3.46448 6.71041 3.35422 7.08226 3.35422C7.58089 3.35422 8.0591 3.5523 8.41169 3.90489C8.76428 4.25748 8.96236 4.73569 8.96236 5.23432ZM13.8945 5.54768C13.7817 5.73569 11.1621 10.2479 7.08226 10.2479C3.00242 10.2479 0.382804 5.73569 0.269997 5.54768C0.214993 5.45241 0.186035 5.34433 0.186035 5.23432C0.186035 5.12432 0.214993 5.01624 0.269997 4.92097C0.382804 4.73296 3.00242 0.220703 7.08226 0.220703C11.1621 0.220703 13.7817 4.73296 13.8945 4.92097C13.9495 5.01624 13.9785 5.12432 13.9785 5.23432C13.9785 5.34433 13.9495 5.45241 13.8945 5.54768ZM10.2158 5.23432C10.2158 4.61457 10.032 4.00874 9.68768 3.49344C9.34336 2.97813 8.85397 2.5765 8.2814 2.33934C7.70882 2.10217 7.07878 2.04011 6.47094 2.16102C5.8631 2.28193 5.30476 2.58037 4.86653 3.0186C4.4283 3.45683 4.12986 4.01516 4.00895 4.62301C3.88804 5.23085 3.9501 5.86089 4.18727 6.43347C4.42443 7.00604 4.82607 7.49543 5.34137 7.83975C5.85667 8.18406 6.46251 8.36784 7.08226 8.36784C7.91331 8.36784 8.71034 8.0377 9.29798 7.45005C9.88563 6.86241 10.2158 6.06538 10.2158 5.23432Z"
                        fill="#B1B1B1"
                      />
                    </svg>
                  </Button>
                </div>
              </Col>
              <Col lg="8" className="my-2">
                <div className={`${styles.btnWrpper} pt-3 btnWrpper`}>
                  <Button
                    onClick={() => navigate("/login")}
                    className="d-flex align-items-center justify-content-center w-100 commonBtn"
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
