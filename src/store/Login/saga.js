import { put, call, takeEvery } from "redux-saga/effects";
import * as CONST from "./actionTypes";
import * as ACTION from "./actions";
import { toast } from "react-toastify";
import { LOGIN_ADMIN, ME_QUERY } from "../../services/ApiCalls";
import requestNotificationPermission from "../../firebase";

function* loginUserSaga({ payload, callBack }) {
  try {
    const fcmToken = yield call(requestNotificationPermission);
    const response = yield call(LOGIN_ADMIN, { ...payload, fcmToken });
    if (response?.data?.success) {
      toast.dismiss();
      toast.success(response?.data?.message);
      localStorage.setItem("token", response?.data?.token || "");
      localStorage.setItem("_id", response?.data?.data?._id);
      localStorage.setItem("profileImage", response?.data?.profileImage);
      localStorage.setItem("name", response?.data?.data?.name);
      localStorage.setItem("mobileNumber", response?.data?.data?.mobileNumber);
      localStorage.setItem("roles", response?.data?.data?.roles);
      callBack && callBack();
      yield put(ACTION.loginAdmin_Success(response?.data));
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

function* LoginSaga() {
  yield takeEvery(CONST.LOGIN_ADMIN, loginUserSaga);
  yield takeEvery(CONST.GET_ADMIN_DETAILS, meQuery);
}

export default LoginSaga;
