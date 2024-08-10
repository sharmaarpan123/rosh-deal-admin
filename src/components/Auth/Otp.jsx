import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// css
import OTPInput from "react-otp-input";
import styles from "../../layout/Auth/Auth.module.scss";

// css

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { forgetPasswordScreenEnum } from "../../pages/AuthPages/forgotPassword/Index";
import { OTP_VERIFY } from "../../services/ApiCalls";
import { catchAsync, checkResponse } from "../../utilities/utilities";

const schema = z.object({
  otp: z
    .string()
    .min(4, { message: "otp is required" })
    .refine((data) => !isNaN(data), {
      message: "Otp only contain a Numeric value",
    }),
});

const Otp = ({ email, setScreen }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const submitHandler = catchAsync(async (data) => {
    const res = await OTP_VERIFY({
      email,
      OTP: data.otp,
    });
    const success = checkResponse({ res, showSuccess: true });
    if (success) {
      setScreen(forgetPasswordScreenEnum.resetPassword);
    }
  });

  return (
    <>
      <div className="formInner position-relative px-lg-3">
        <div className="w-100 inner">
          <div className="top py-2">
            <div className="d-flex align-items-center gap-10">
              <span
                role="button"
                onClick={() =>
                  setScreen(forgetPasswordScreenEnum.forgetPassword)
                }
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
              </span>
              <h4 className="m-0 fw-sbold themeClr">Enter Otp</h4>
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
                        value={field.value}
                        onChange={field.onChange}
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
              <Col lg="8" className="my-2">
                <div className={`${styles.btnWrpper} pt-3 btnWrpper`}>
                  <Button
                    type="submit"
                    className="d-flex align-items-center justify-content-center w-100 commonBtn"
                  >
                    Save
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
export default Otp;
