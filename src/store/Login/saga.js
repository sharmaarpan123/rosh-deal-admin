import { put, call, takeEvery } from "redux-saga/effects";
import * as CONST from "./actionTypes";
import * as ACTION from "./actions";
import { toast } from "react-toastify";
import {
  LOGIN_ADMIN,
  LOGIN_SELLER,
  ME_QUERY,
  SELLER_ME_QUERY,
} from "../../services/ApiCalls";
import requestNotificationPermission from "../../firebase";

function* loginUserSaga({ payload, callBack }) {
  try {
    const fcmToken = yield call(requestNotificationPermission);
    const response = yield call(
      payload?.userType === "agency" ? LOGIN_ADMIN : LOGIN_SELLER,
      { ...payload, fcmToken }
    );
    if (response?.data?.success) {
      toast.dismiss();
      toast.success(response?.data?.message);
      localStorage.setItem("token", response?.data?.token || "");
      localStorage.setItem("_id", response?.data?.data?._id);
      localStorage.setItem("profileImage", response?.data?.profileImage);
      localStorage.setItem("name", response?.data?.data?.name);
      localStorage.setItem("mobileNumber", response?.data?.data?.mobileNumber);
      localStorage.setItem("roles", response?.data?.data?.roles);
      if (payload?.userType === "agency") {
        localStorage.setItem("isSeller", "false");
      } else {
        localStorage.setItem("isSeller", "true");
      }
      callBack && callBack();
      yield put(
        ACTION.loginAdmin_Success({
          ...response?.data,
          userType: payload?.userType,
        })
      );
    } else {
      toast.dismiss();
      toast.error(response?.response?.data?.message);
      yield put(ACTION.loginAdmin_Fail(response?.response?.data?.message));
    }
  } catch (error) {
    console.log(error, "Error");
    toast.dismiss();
    toast.error(error?.data?.message);
    yield put(ACTION.loginAdmin_Fail(error));
  }
}

function* meQuery() {
  try {
    const response = yield call(ME_QUERY, {
      token: localStorage.getItem("token"),
    });
    if (response?.data?.success) {
      yield put(ACTION.getAdminDetails_Success(response?.data?.data));
    } else {
      toast.error(response?.response?.data?.message);
      yield put(ACTION.loginAdmin_Fail(response?.response?.data?.message));
    }
  } catch (error) {
    console.log(error, "Error");
    toast.dismiss();
    toast.error(error?.data?.message);
    yield put(ACTION.loginAdmin_Fail(error));
  }
}
function* sellerMeQuery() {
  try {
    const response = yield call(SELLER_ME_QUERY, {
      token: localStorage.getItem("token"),
    });
    if (response?.data?.success) {
      yield put(ACTION.getSellerDetails_Success(response?.data?.data));
    } else {
      toast.error(response?.response?.data?.message);
      yield put(
        ACTION.getSellerDetails_Fail(response?.response?.data?.message)
      );
    }
  } catch (error) {
    console.log(error, "Error");
    toast.dismiss();
    toast.error(error?.data?.message);
    yield put(ACTION.getSellerDetails_Fail(error));
  }
}
function* LoginSaga() {
  yield takeEvery(CONST.LOGIN_ADMIN, loginUserSaga);
  yield takeEvery(CONST.LOGIN_SELLER, loginUserSaga);
  yield takeEvery(CONST.GET_ADMIN_DETAILS, meQuery);
  yield takeEvery(CONST.GET_SELLER_DETAILS, sellerMeQuery);
}

export default LoginSaga;
