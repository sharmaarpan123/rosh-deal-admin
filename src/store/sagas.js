import { all, fork } from "redux-saga/effects";

//public
import LoginSaga from "./Login/saga";

export default function* rootSaga() {
  yield all([fork(LoginSaga)]);
}
