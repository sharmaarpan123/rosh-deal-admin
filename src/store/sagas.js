import { all, fork } from "redux-saga/effects";

//public
import LoginSaga from "./Login/saga";
import PlatformsSaga from "./Platform/saga";

export default function* rootSaga() {
  yield all([fork(LoginSaga)]);
  yield all([fork(PlatformsSaga)]);
}
