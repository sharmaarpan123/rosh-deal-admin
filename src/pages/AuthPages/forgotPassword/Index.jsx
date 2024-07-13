import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

// css
import styles from "../../../layout/Auth/Auth.module.scss";
import ForgetPassword from "../../../components/Auth/ForgetPassword";
import Otp from "../../../components/Auth/Otp";
import ResetPassword from "../../../components/Auth/ResetPassword";
export const forgetPasswordScreenEnum = {
  otp: "otp",
  forgetPassword: "forgetPassword",
  resetPassword: "resetPassword",
};
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [screen, setScreen] = useState(forgetPasswordScreenEnum.forgetPassword);

  return (
    <>
      {screen === forgetPasswordScreenEnum.forgetPassword && (
        <ForgetPassword setScreen={setScreen} setEmail={setEmail} />
      )}
      {screen === forgetPasswordScreenEnum.otp && (
        <Otp setScreen={setScreen} email={email} />
      )}
      {screen === forgetPasswordScreenEnum.resetPassword && (
        <ResetPassword email={email} />
      )}
    </>
  );
};
export default ForgotPassword;
