import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// css
import styles from "../../layout/Auth/Auth.module.scss";
// css

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { RESET_PASSWORD } from "../../services/ApiCalls";
import { catchAsync, checkResponse } from "../../utilities/utilities";
import OTPInput from "react-otp-input";
import OpenEye from "../Common/icon/svg/OpenEye";
import CloseEye from "../Common/icon/svg/CloseEye";

const schema = z
  .object({
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
    confirmPassword: z
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
    otp: z
      .string()
      .min(4, { message: "otp is required" })
      .refine((data) => !isNaN(data), {
        message: "Otp should only contain a Numeric value.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "New Password and Confirm Password must match.",
  });
const ResetPassword = ({ email }) => {
  const navigate = useNavigate();
  const [pass, setPass] = useState();
  const [pass2, setPass2] = useState();
  const handlePass = () => {
    setPass((p) => !p);
  };
  const handlePass2 = () => {
    setPass2((p) => !p);
  };

  const submitHandler = catchAsync(async (data) => {
    console.log(data, "Data");
    const res = await RESET_PASSWORD({
      email,
      ...data,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    const success = checkResponse({
      res,
      showSuccess: true,
    });

    if (success) {
      navigate("/login");
    }
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  return (
    <>
      <div className="formInner position-relative px-lg-3">
        <div className="w-100 inner">
          <div className="top py-2">
            <div className="d-flex align-items-center gap-10">
              <h4 className="m-0 fw-sbold themeClr">Reset Password</h4>
            </div>
          </div>
          <Form
            className={`${styles.form} pt-lg-4 pt-2`}
            onSubmit={handleSubmit(submitHandler)}
          >
            <Row className="justify-content-center">
              <Col lg="12" className="my-2">
                <div className="otpWrp">
                  <Controller
                    control={control}
                    name="otp"
                    render={({ field }) => (
                      <OTPInput
                        inputType="tel"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        numInputs={4}
                        renderInput={(props) => <input {...props} />}
                      />
                    )}
                  />
                  {
                    <p className="text-danger">
                      {errors?.otp && errors.otp.message}
                    </p>
                  }
                </div>
              </Col>
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
                {
                  <p className="text-danger">
                    {errors?.password && errors.password?.message}
                  </p>
                }
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
                    type={pass2 ? "text" : "password"}
                    className={`${styles.formControl} form-control pe-5`}
                    placeholder="*************"
                    {...register("confirmPassword")}
                  />

                  <Button
                    onClick={handlePass2}
                    className="border-0 p-0 position-absolute icn"
                    variant="transparent"
                    style={{ right: 10 }}
                  >
                    {!pass2 ? <OpenEye /> : <CloseEye />}
                  </Button>
                </div>
                {
                  <p className="text-danger">
                    {errors?.confirmPassword && errors.confirmPassword?.message}
                  </p>
                }
              </Col>
              <Col lg="8" className="my-2">
                <div
                  className={`${styles.btnWrpper} pt-3 btnWrpper  d-flex justify-content-center flex-column`}
                >
                  <Button
                    type="submit"
                    className="d-flex align-items-center justify-content-center w-100 commonBtn"
                  >
                    Submit
                  </Button>
                  <Link
                    to="/login"
                    className="mt-2 d-inline-flex align-items-center justify-content-center  py-2 font-sbold  broder-light btn "
                  >
                    Back to login
                  </Link>
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
