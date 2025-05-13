import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import { watchThemeSaga } from "./themeSaga";

export default function* rootSaga() {
  yield all([authSaga(), watchThemeSaga()]);
}
