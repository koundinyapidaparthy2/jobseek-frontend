import { delay, call, put, select, takeLatest } from "redux-saga/effects";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  uploadResumeRequest,
  uploadResumeSuccess,
  uploadResumeFailure,
  setUploadProgress,
  setResumeStatus,
  getProfileRequest,
  generateAboutRequest,
  generateAboutSuccess,
  generateAboutFailure,
  downloadResumeRequest,
  downloadResumeSuccess,
  downloadResumeFailure,
} from "../slices/profileSlice";
import {
  updateProfileApi,
  uploadResumeToFirestoreApi,
  checkResumeStatusApi,
  getProfileApi,
  generateAboutApi,
} from "../../api/profileApi";
import { enqueueSnackbar } from "notistack";
import { downloadResumeViaBackend } from "../../api/profileApi";

function* handleGenerateAbout() {
  try {
    const token = yield select((state) => state.auth.accessToken);
    const profile = yield select((state) => state.profile.parsedProfile);
    const res = yield call(generateAboutApi, profile, token);
    yield put(generateAboutSuccess(res.summaries));
  } catch (error) {
    yield put(generateAboutFailure(error.message));
  }
}

function* pollResumeStatus() {
  const token = yield select((state) => state.auth.accessToken);

  while (true) {
    try {
      const res = yield call(checkResumeStatusApi, token);
      const data = res.data;

      yield put(setResumeStatus(data));

      if (data.status === "completed") {
        yield put(uploadResumeSuccess(data.profile));
        enqueueSnackbar("Resume parsed successfully!", { variant: "success" });
        break;
      } else if (data.status === "failed") {
        yield put(uploadResumeFailure(data.error));
        enqueueSnackbar("Resume parsing failed: " + data.error, {
          variant: "error",
        });
        break;
      }
    } catch (err) {
      enqueueSnackbar("Error checking resume status", { variant: "error" });
      break;
    }

    yield delay(2000); // wait 2 seconds before polling again
  }
}

function* handleUploadResume(action) {
  try {
    const token = yield select((state) => state.auth.accessToken);

    const onUploadProgress = (e) => {
      const percent = Math.round((e.loaded * 100) / e.total);
      put(setUploadProgress(percent));
    };

    const res = yield call(
      uploadResumeToFirestoreApi,
      action.payload,
      token,
      onUploadProgress
    );
    const { processId } = res.data;

    yield put(setResumeStatus({ status: "processing", processId }));

    yield call(pollResumeStatus);
  } catch (error) {
    enqueueSnackbar(error.message || "Resume upload failed", {
      variant: "error",
    });
  } finally {
    put(setUploadProgress(0));
  }
}

function* handleUpdateProfile(action) {
  try {
    const token = yield select((state) => state.auth.accessToken);
    const res = yield call(updateProfileApi, action.payload, token);

    yield put(updateProfileSuccess(res.profile));
    enqueueSnackbar("Profile updated successfully", { variant: "success" });
  } catch (error) {
    yield put(updateProfileFailure(error.message));
    enqueueSnackbar(error.message || "Update failed", { variant: "error" });
  }
}

function* getProfile() {
  try {
    const token = yield select((state) => state.auth.accessToken);
    const res = yield call(getProfileApi, token);

    yield put(updateProfileSuccess(res));
  } catch (error) {
    yield put(updateProfileFailure(error.message));
  }
}

function* handleDownloadResume(action) {
  try {
    const token = yield select((state) => state.auth.accessToken);
    const { resumeUrl } = action.payload;

    const { base64, mimeType } = yield call(
      downloadResumeViaBackend,
      resumeUrl,
      token
    );

    // Create blob and trigger download
    const byteCharacters = atob(base64);
    const byteArray = new Uint8Array(
      [...byteCharacters].map((char) => char.charCodeAt(0))
    );

    const blob = new Blob([byteArray], { type: mimeType });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "resume." + mimeType.split("/")[1];
    document.body.appendChild(link);
    link.click();
    link.remove();

    yield put(downloadResumeSuccess());
    enqueueSnackbar("Resume downloaded successfully!", { variant: "success" });
  } catch (error) {
    yield put(downloadResumeFailure(error.message));
    enqueueSnackbar("Resume download failed: " + error.message, {
      variant: "error",
    });
  }
}

export default function* profileSaga() {
  yield takeLatest(generateAboutRequest.type, handleGenerateAbout);
  yield takeLatest(updateProfileRequest.type, handleUpdateProfile);
  yield takeLatest(uploadResumeRequest.type, handleUploadResume); // 👈 NEW
  yield takeLatest(getProfileRequest.type, getProfile);
  yield takeLatest(downloadResumeRequest.type, handleDownloadResume);
}
