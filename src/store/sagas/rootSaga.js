import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import themeSaga from "./themeSaga";
import profileSaga from "./profileSaga";
import resumeTemplateSaga from "./templates/resumeTemplateSaga";
const sagas = [authSaga, themeSaga, profileSaga, resumeTemplateSaga];
export default function* rootSaga() {
  yield all(sagas.map((saga) => saga()));
}
