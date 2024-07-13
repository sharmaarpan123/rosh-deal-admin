import { put, call, takeEvery } from "redux-saga/effects";
import * as CONST from "./actionTypes";
import * as ACTION from "./actions";
import { toast } from "react-toastify";
import { LOGIN_ADMIN } from "../../services/ApiCalls";

function* loginUserSaga({ payload, callBack }) {
  try {
    const response = yield call(LOGIN_ADMIN, payload);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      localStorage.setItem("token", response?.data?.token || "");
      localStorage.setItem("_id", response?.data?.data?._id);
      localStorage.setItem("profileImage", response?.data?.profileImage);
      localStorage.setItem("name", response?.data?.data?.name);
      localStorage.setItem("mobileNumber", response?.data?.data?.mobileNumber);
      localStorage.setItem("role", response?.data?.data?.role);
      callBack && callBack();
      yield put(ACTION.loginAdmin_Success(response?.data));
    } else {
      toast.error(response?.response?.data?.message);
      yield put(ACTION.loginAdmin_Fail(response?.response?.data?.message));
    }
  } catch (error) {
    console.log(error, "Error");
    toast.error(error?.data?.message);
    yield put(ACTION.loginAdmin_Fail(error));
  }
}

function* LoginSaga() {
  yield takeEvery(CONST.LOGIN_ADMIN, loginUserSaga);
}

export default LoginSaga;
