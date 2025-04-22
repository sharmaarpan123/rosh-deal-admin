import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_AS_SELLER,
} from "../../../../services/ApiCalls";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";
import { useSelector } from "react-redux";

const schema = z
  .object({
    oldPassword: z
      .string()
      .min(1, {
        message: "Password is required",
      })
      .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
      .regex(/[0-9]/, { message: "Password must include a number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must include a special character or symbol",
      }),
    newPassword: z
      .string()
      .min(1, {
        message: "Password is required",
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
        message: "Password is required",
      })
      .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
      .regex(/[0-9]/, { message: "Password must include a number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must include a special character or symbol",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "New Password and Confirm Password must match.",
  });

const ManagePassword = () => {
  const navigate = useNavigate();

  const { admin } = useSelector((s) => s.login);

  const [showPassWord, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleShowPassword = (key) => {
    setShowPassword((p) => ({
      ...p,
      [key]: !p[key],
    }));
  };

  const submitHandler = catchAsync(async (data) => {
    const res = await (admin?.roles?.includes("seller")
      ? CHANGE_PASSWORD_AS_SELLER(data)
      : CHANGE_PASSWORD(data));

    const success = checkResponse({
      res,
      showSuccess: true,
    });

    if (success) {
      localStorage.clear();
      window.location.replace("/");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    mode: "onChange",
  });
  return (
    <>
      <section className="managePassword py-3 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <div className="d-flex align-items-center gap-10">
                <Link
                  to="/settings"
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
                  Change Password
                </h4>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <div
                className="formWrpper px-lg-5 p-md-4 p-3 rounded"
                style={{ background: "#EEEEEE" }}
              >
                <Form onSubmit={handleSubmit(submitHandler)}>
                  <Row className="justify-content-between">
                    <Col lg="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label fw-sbold text-muted ps-2 m-0"
                      >
                        Enter Current Password
                      </label>
                      <div className="position-relative iconWithText">
                        <Button
                          style={{ right: 10 }}
                          onClick={() => toggleShowPassword("oldPassword")}
                          variant="transparent"
                          className="icn border-0 p-0 position-absolute"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="11"
                            viewBox="0 0 15 11"
                            fill="none"
                          >
                            <path
                              d="M9.59688 5.13081C9.59688 5.50266 9.48662 5.86616 9.28003 6.17534C9.07344 6.48452 8.77981 6.7255 8.43626 6.8678C8.09272 7.0101 7.71469 7.04734 7.34999 6.97479C6.98528 6.90225 6.65028 6.72318 6.38734 6.46025C6.1244 6.19731 5.94534 5.86231 5.87279 5.4976C5.80025 5.13289 5.83748 4.75487 5.97978 4.41132C6.12208 4.06778 6.36306 3.77415 6.67225 3.56756C6.98143 3.36097 7.34493 3.2507 7.71678 3.2507C8.21541 3.2507 8.69363 3.44878 9.04621 3.80137C9.3988 4.15396 9.59688 4.63217 9.59688 5.13081ZM14.529 5.44416C14.4162 5.63217 11.7966 10.1444 7.71678 10.1444C3.63694 10.1444 1.01733 5.63217 0.904519 5.44416C0.849514 5.34889 0.820557 5.24082 0.820557 5.13081C0.820557 5.0208 0.849514 4.91273 0.904519 4.81746C1.01733 4.62945 3.63694 0.117188 7.71678 0.117188C11.7966 0.117188 14.4162 4.62945 14.529 4.81746C14.584 4.91273 14.613 5.0208 14.613 5.13081C14.613 5.24082 14.584 5.34889 14.529 5.44416ZM10.8503 5.13081C10.8503 4.51106 10.6665 3.90523 10.3222 3.38992C9.97788 2.87462 9.48849 2.47299 8.91592 2.23582C8.34335 1.99865 7.7133 1.9366 7.10546 2.05751C6.49762 2.17841 5.93928 2.47685 5.50105 2.91508C5.06282 3.35331 4.76438 3.91165 4.64347 4.51949C4.52257 5.12733 4.58462 5.75738 4.82179 6.32995C5.05896 6.90253 5.46059 7.39192 5.97589 7.73623C6.49119 8.08055 7.09703 8.26432 7.71678 8.26432C8.54784 8.26432 9.34486 7.93419 9.93251 7.34654C10.5202 6.75889 10.8503 5.96187 10.8503 5.13081Z"
                              fill="#B1B1B1"
                            />
                          </svg>
                        </Button>
                        <input
                          type={!showPassWord?.oldPassword ? "password" : ""}
                          placeholder="*************"
                          className="form-control pe-5"
                          {...register("oldPassword")}
                        />
                      </div>
                      {
                        <p className="text-danger">
                          {errors?.oldPassword && errors.oldPassword.message}
                        </p>
                      }
                    </Col>
                    <Col lg="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label fw-sbold text-muted ps-2 m-0"
                      >
                        Enter New Password
                      </label>
                      <div className="position-relative iconWithText">
                        <Button
                          style={{ right: 10 }}
                          variant="transparent"
                          className="icn border-0 p-0 position-absolute"
                          onClick={() => toggleShowPassword("newPassword")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="11"
                            viewBox="0 0 15 11"
                            fill="none"
                          >
                            <path
                              d="M9.59688 5.13081C9.59688 5.50266 9.48662 5.86616 9.28003 6.17534C9.07344 6.48452 8.77981 6.7255 8.43626 6.8678C8.09272 7.0101 7.71469 7.04734 7.34999 6.97479C6.98528 6.90225 6.65028 6.72318 6.38734 6.46025C6.1244 6.19731 5.94534 5.86231 5.87279 5.4976C5.80025 5.13289 5.83748 4.75487 5.97978 4.41132C6.12208 4.06778 6.36306 3.77415 6.67225 3.56756C6.98143 3.36097 7.34493 3.2507 7.71678 3.2507C8.21541 3.2507 8.69363 3.44878 9.04621 3.80137C9.3988 4.15396 9.59688 4.63217 9.59688 5.13081ZM14.529 5.44416C14.4162 5.63217 11.7966 10.1444 7.71678 10.1444C3.63694 10.1444 1.01733 5.63217 0.904519 5.44416C0.849514 5.34889 0.820557 5.24082 0.820557 5.13081C0.820557 5.0208 0.849514 4.91273 0.904519 4.81746C1.01733 4.62945 3.63694 0.117188 7.71678 0.117188C11.7966 0.117188 14.4162 4.62945 14.529 4.81746C14.584 4.91273 14.613 5.0208 14.613 5.13081C14.613 5.24082 14.584 5.34889 14.529 5.44416ZM10.8503 5.13081C10.8503 4.51106 10.6665 3.90523 10.3222 3.38992C9.97788 2.87462 9.48849 2.47299 8.91592 2.23582C8.34335 1.99865 7.7133 1.9366 7.10546 2.05751C6.49762 2.17841 5.93928 2.47685 5.50105 2.91508C5.06282 3.35331 4.76438 3.91165 4.64347 4.51949C4.52257 5.12733 4.58462 5.75738 4.82179 6.32995C5.05896 6.90253 5.46059 7.39192 5.97589 7.73623C6.49119 8.08055 7.09703 8.26432 7.71678 8.26432C8.54784 8.26432 9.34486 7.93419 9.93251 7.34654C10.5202 6.75889 10.8503 5.96187 10.8503 5.13081Z"
                              fill="#B1B1B1"
                            />
                          </svg>
                        </Button>
                        <input
                          type={!showPassWord?.newPassword ? "password" : ""}
                          {...register("newPassword")}
                          placeholder="*************"
                          className="form-control pe-5"
                        />
                      </div>
                      {
                        <p className="text-danger">
                          {errors?.newPassword && errors.newPassword.message}
                        </p>
                      }
                    </Col>
                    <Col lg="12" className="my-2">
                      <label
                        htmlFor=""
                        className="form-label fw-sbold text-muted ps-2 m-0"
                      >
                        Confirm New Password
                      </label>
                      <div className="position-relative iconWithText">
                        <Button
                          style={{ right: 10 }}
                          variant="transparent"
                          onClick={() => toggleShowPassword("confirmPassword")}
                          className="icn border-0 p-0 position-absolute"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="11"
                            viewBox="0 0 15 11"
                            fill="none"
                          >
                            <path
                              d="M9.59688 5.13081C9.59688 5.50266 9.48662 5.86616 9.28003 6.17534C9.07344 6.48452 8.77981 6.7255 8.43626 6.8678C8.09272 7.0101 7.71469 7.04734 7.34999 6.97479C6.98528 6.90225 6.65028 6.72318 6.38734 6.46025C6.1244 6.19731 5.94534 5.86231 5.87279 5.4976C5.80025 5.13289 5.83748 4.75487 5.97978 4.41132C6.12208 4.06778 6.36306 3.77415 6.67225 3.56756C6.98143 3.36097 7.34493 3.2507 7.71678 3.2507C8.21541 3.2507 8.69363 3.44878 9.04621 3.80137C9.3988 4.15396 9.59688 4.63217 9.59688 5.13081ZM14.529 5.44416C14.4162 5.63217 11.7966 10.1444 7.71678 10.1444C3.63694 10.1444 1.01733 5.63217 0.904519 5.44416C0.849514 5.34889 0.820557 5.24082 0.820557 5.13081C0.820557 5.0208 0.849514 4.91273 0.904519 4.81746C1.01733 4.62945 3.63694 0.117188 7.71678 0.117188C11.7966 0.117188 14.4162 4.62945 14.529 4.81746C14.584 4.91273 14.613 5.0208 14.613 5.13081C14.613 5.24082 14.584 5.34889 14.529 5.44416ZM10.8503 5.13081C10.8503 4.51106 10.6665 3.90523 10.3222 3.38992C9.97788 2.87462 9.48849 2.47299 8.91592 2.23582C8.34335 1.99865 7.7133 1.9366 7.10546 2.05751C6.49762 2.17841 5.93928 2.47685 5.50105 2.91508C5.06282 3.35331 4.76438 3.91165 4.64347 4.51949C4.52257 5.12733 4.58462 5.75738 4.82179 6.32995C5.05896 6.90253 5.46059 7.39192 5.97589 7.73623C6.49119 8.08055 7.09703 8.26432 7.71678 8.26432C8.54784 8.26432 9.34486 7.93419 9.93251 7.34654C10.5202 6.75889 10.8503 5.96187 10.8503 5.13081Z"
                              fill="#B1B1B1"
                            />
                          </svg>
                        </Button>
                        <input
                          type={
                            !showPassWord?.confirmPassword ? "password" : ""
                          }
                          {...register("confirmPassword")}
                          placeholder="*************"
                          className="form-control pe-5"
                        />
                      </div>
                      {
                        <p className="text-danger">
                          {errors?.confirmPassword &&
                            errors.confirmPassword.message}
                        </p>
                      }
                    </Col>
                    <Col lg="12" className="my-2">
                      <div className="d-flex align-items-center justify-content-center gap-10 mt-4">
                        <Button
                          className="d-flex align-items-center justify-content-center commonBtn GreyBtn"
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="d-flex align-items-center justify-content-center commonBtn "
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ManagePassword;
