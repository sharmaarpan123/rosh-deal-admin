import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// css
import styles from "../../../layout/Auth/Auth.module.scss";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginAdmin } from "../../../store/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

const schema = z.object({
  phoneNumber: z
    .string({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number should be valid",
    })
    .min(1, { message: "Phone Number should contain 10 digit" })
    .max(10, { message: "Phone Number should contain max 10 digit" })
    .refine((data) => !isNaN(data), { message: "Number should be numeric" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState();
  const handlePass = () => {
    setPass(!pass);
  };
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data) => {
    const callBack = (status) => {
      navigate("/dashboard");
    };
    dispatch(loginAdmin(data, callBack));
  };
  return (
    <>
      <div className="formInner position-relative px-lg-3">
        <div className="w-100 inner">
          <div className="top py-2">
            <h4 className="m-0 fw-sbold themeClr">Log In</h4>
          </div>
          <Form
            className={`${styles.form} pt-lg-4 pt-2`}
            onSubmit={handleSubmit(submitHandler)}
          >
            <Row className="justify-content-center">
              <Col lg="12" className="my-2">
                <label
                  htmlFor="Email ID / Phone number"
                  className="form-label m-0 pb-1 themeClr fw-sbold"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  className={`${styles.formControl} form-control`}
                  placeholder="123456789"
                  {...register("phoneNumber")}
                />
                {errors?.phoneNumber && (
                  <p className="text-danger m-0">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </Col>
              <Col lg="12" className="my-2">
                <label
                  htmlFor=""
                  className="form-label m-0 pb-1 themeClr fw-sbold"
                >
                  Password
                </label>
                <div className="position-relative iconWithText">
                  <input
                    type={pass ? "text" : "password"}
                    className={`${styles.formControl} form-control`}
                    placeholder="*************"
                    {...register("password")}
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
                {errors?.password && (
                  <p className="text-danger m-0">{errors.password.message}</p>
                )}
              </Col>
              <Col lg="12" className="my-2">
                <div className="text-end">
                  <Link to="/forgot-password" className={`themeClr`}>
                    Forgot Password?
                  </Link>
                </div>
              </Col>
              <Col lg="8" className="my-2">
                <div className={`${styles.btnWrpper} pt-3 btnWrpper`}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="d-flex align-items-center justify-content-center w-100 commonBtn"
                  >
                    {loading ? "Loading..." : "Login"}
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
export default Login;
