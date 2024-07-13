import { useSelector } from "react-redux";
import * as CONST from "./actionTypes";
import { startTransition } from "react";

const intialState = {
  isLogin: false,
  loading: false,
  token: (localStorage && localStorage.getItem("token")) || null,
  _id: (localStorage && localStorage.getItem("_id")) || null,
  profileImage: (localStorage && localStorage.getItem("profileImage")) || null,
};

const LoginReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case CONST.LOGIN_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case CONST.LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        loading: false,
        token: payload.token,
        _id: payload?.data?._id,
        profileImage: payload?.data?.profileImage,
      };
    case CONST.LOGIN_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        isLogin: false,
        token: null,
        _id: null,
      };

    case CONST.LOGOUT_ADMIN:
      return {
        ...state,
        loading: false,
        isLogin: false,
        token: null,
        _id: null,
      };

    case CONST.CHANGE_PROFILE_IMAGE:
      localStorage.setItem("profileImage", payload);
      return {
        ...state,
        profileImage: payload,
      };

    default:
      return state;

      break;
  }
};

export default LoginReducer;
