import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import themeSaga from "./themeSaga";
import profileSaga from "./profileSaga";

const sagas = [authSaga, themeSaga, profileSaga];
export default function* rootSaga() {
  yield all(sagas.map((saga) => saga()));
}
