import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// css
import styles from "../../../layout/Auth/Auth.module.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import CloseEye from "../../../components/Common/icon/svg/CloseEye";
import OpenEye from "../../../components/Common/icon/svg/OpenEye";
import { loginAdmin } from "../../../store/actions";

const schema = z.object({
  phoneNumber: z
    .string({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number should be valid",
    })
    .trim()
    .min(1, { message: "Please enter your mobile number" })
    .min(10, { message: "Phone Number should contain 10 digit" })
    .max(10, { message: "Phone Number should contain max 10 digit" }),
  password: z
    .string()
    .min(1, {
      message:
        "Password must include a lowercase letter, an uppercase letter, a number, and a special character or symbol",
    })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must include a number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must include a special character or symbol",
    }),
});

const Login = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState();
  const [activeTab, setActiveTab] = useState("agency");
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
      if (activeTab === "seller") {
        navigate("/seller/deals");
      } else {
        navigate("/dashboard");
      }
    };
    dispatch(loginAdmin({ ...data, userType: activeTab }, callBack));
  };

  return (
    <>
      <div className="formInner position-relative px-lg-3">
        <div className="w-100 inner">
          <div className="top py-2">
            <h4 className="m-0 fw-sbold themeClr">Log In</h4>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <div className="bg-light rounded-4 p-2 d-flex gap-2" style={{ width: '100%', maxWidth: '400px' }}>
              <button
                onClick={() => setActiveTab("agency")}
                className={`btn border-0 px-4 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 flex-grow-1 ${
                  activeTab === "agency" ? "bg-primary text-white" : "text-muted"
                }`}
              >
                <i className="bi bi-building"></i>
                <span>Agency/Mediator</span>
              </button>
              <button
                onClick={() => setActiveTab("seller")}
                className={`btn border-0 px-4 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 flex-grow-1 ${
                  activeTab === "seller" ? "bg-primary text-white" : "text-muted"
                }`}
              >
                <i className="bi bi-person"></i>
                <span>Seller</span>
              </button>
            </div>
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
                  type="tel"
                  className={`${styles.formControl} form-control`}
                  placeholder="123456789"
                  maxLength={10}
                  minLength={10}
                  {...register("phoneNumber", { pattern: /^[0-9]{0,10}$/ })}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/\D/g, ""))
                  }
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
                    className={`${styles.formControl} form-control pe-5`}
                    placeholder="*************"
                    {...register("password")}
                  />

                  <Button
                    onClick={handlePass}
                    className="border-0 p-0 position-absolute icn"
                    variant="transparent"
                    style={{ right: 10 }}
                  >
                    {!pass ? <OpenEye /> : <CloseEye />}
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
