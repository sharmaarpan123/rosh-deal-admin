import React, { useState } from "react";

// css
import ForgetPassword from "../../../components/Auth/ForgetPassword";
import ResetPassword from "../../../components/Auth/ResetPassword";
export const forgetPasswordScreenEnum = {
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
      {screen === forgetPasswordScreenEnum.resetPassword && (
        <ResetPassword email={email} />
      )}
    </>
  );
};
export default ForgotPassword;
