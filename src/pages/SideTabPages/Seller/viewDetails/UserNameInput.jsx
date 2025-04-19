import React, { useEffect, useState } from "react";
import { CHECK_ADMIN_USER_NAME_EXISTS } from "../../../../services/ApiCalls";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";
import Loading from "../../../../components/Common/Loading";

let timeOutId;

const UserNameInput = ({ register, watch, errors }) => {
  const [checkUserNameLoading, SetCheckUserNameLoading] = useState(false);
  const [userNameStatus, setUserNameStatus] = useState({
    success: false,
    userName: "",
  });

  const checkIsUserNameExists = catchAsync(async () => {
    SetCheckUserNameLoading(true);
    const res = await CHECK_ADMIN_USER_NAME_EXISTS({
      userName: watch("userName"),
    });

    const success = checkResponse({
      res,
      setLoader: SetCheckUserNameLoading,
      showError: false,
    });
    if (success) {
      setUserNameStatus((p) => ({
        success,
        userName: res?.data?.data?.userName,
      }));
    } else {
      if (watch("userName") === res?.response?.data?.data?.userName) {
        // in edit mode if user again fill the same userName
        return setUserNameStatus((p) => ({
          success: false,
          userName: "",
        }));
      }
      setUserNameStatus((p) => ({
        success,
        userName: res?.response?.data?.data?.userName,
      }));
    }
  });

  const debouncing = () => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      watch("userName") && checkIsUserNameExists();
    }, 600);
  };

  //   useEffect(() => {
  //     if (watch("userName")) {
  //       debouncing();
  //     } else {
  //       setUserNameStatus({ success: false, userName: "" });
  //     }
  //   }, [watch("userName")]);

  const onchangeHandler = (value) => {
    if (value) {
      debouncing();
    } else {
      setUserNameStatus({ success: false, userName: "" });
    }
  };

  const { onChange: registerOnChange, ...restRegister } = {
    ...register("userName"),
  };

  return (
    <div className="py-2">
      <label htmlFor="" className="form-label fw-sbold text-muted ps-2 m-0">
        User Name
      </label>
      {watch("userName") && (
        <label className="d-block form-label fw-sbold text-muted ps-2 m-0">
          {" "}
          {checkUserNameLoading ? (
            <Loading />
          ) : userNameStatus.userName ? (
            <span
              className={`${
                userNameStatus.success ? "text-success" : "text-danger"
              }`}
            >
              {" "}
              {userNameStatus.success
                ? "This user Name is available"
                : "This user Name is not available"}
            </span>
          ) : (
            <></>
          )}
        </label>
      )}
      <input
        type="text"
        placeholder="Enter User Name"
        className="form-control"
        {...restRegister}
        onChange={(e) => {
          onchangeHandler(e.target.value);
          registerOnChange(e);
        }}
      />
      {errors?.userName && (
        <p className="text-danger m-0">{errors?.userName?.message}</p>
      )}
    </div>
  );
};

export default UserNameInput;
