import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { PLATFORM_LIST } from "../../services/ApiCalls";
import * as CONST from "./actionTypes";
import * as ACTION from "./actions";

function* platformsSaga() {
  try {
    const response = yield call(PLATFORM_LIST);
    if (response?.data?.success) {
      yield put(ACTION.getPlatforms_Success(response?.data));
    } else {
      toast.error(response?.response?.data?.message);
      yield put(ACTION.getPlatforms_Fail(response?.response?.data?.message));
    }
  } catch (error) {
    toast.error(error?.data?.message);
    yield put(ACTION.getPlatforms_Fail(error));
  }
}

function* PlatformsSaga() {
  yield takeEvery(CONST.GET_PLATFORMS, platformsSaga);
}

export default PlatformsSaga;
