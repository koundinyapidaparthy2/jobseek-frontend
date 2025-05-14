import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from "../slices/profileSlice";
import { updateProfileApi } from "../../api/profileApi";
import { enqueueSnackbar } from "notistack";

function* handleUpdateProfile(action) {
  try {
    const token = yield select((state) => state.auth.accessToken);
    yield call(updateProfileApi, action.payload, token);
    yield put(updateProfileSuccess());
    enqueueSnackbar("Profile updated successfully", { variant: "success" });
  } catch (error) {
    yield put(updateProfileFailure(error.message));
    enqueueSnackbar(error.message || "Update failed", { variant: "error" });
  }
}

export default function* profileSaga() {
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
}
