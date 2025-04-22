import * as CONST from "./actionTypes";

export const loginAdmin = (payload, callBack) => {
  return {
    type:
      payload?.userType === "agency" ? CONST.LOGIN_ADMIN : CONST.LOGIN_SELLER,
    payload,
    callBack,
  };
};

export const loginAdmin_Success = (payload) => ({
  type: CONST.LOGIN_ADMIN_SUCCESS,
  payload,
});

export const loginAdmin_Fail = (payload) => ({
  type: CONST.LOGIN_ADMIN_FAIL,
  payload,
});

export const getAdminDetails = (payload, callBack) => {
  return {
    type: CONST.GET_ADMIN_DETAILS,
    payload,
    callBack,
  };
};

export const getAdminDetails_Success = (payload) => ({
  type: CONST.GET_ADMIN_DETAILS_SUCCESS,
  payload,
});

export const getAdminDetails_Fail = (payload) => ({
  type: CONST.GET_ADMIN_DETAILS_FAIL,
  payload,
});

export const logoutAdmin = (payload) => ({
  type: CONST.LOGOUT_ADMIN,
  payload,
});

export const profileImageChange = (payload) => ({
  type: CONST.CHANGE_PROFILE_IMAGE,
  payload,
});

export const getSellerDetails = (payload, callBack) => {
  return {
    type: CONST.GET_SELLER_DETAILS,
    payload,
    callBack,
  };
};

export const getSellerDetails_Success = (payload) => ({
  type: CONST.GET_SELLER_DETAILS_SUCCESS,
  payload,
});

export const getSellerDetails_Fail = (payload) => ({
  type: CONST.GET_SELLER_DETAILS_FAIL,
  payload,
});
