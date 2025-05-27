// --- Saga: resumeTemplateSaga.js ---
import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  uploadTemplateRequest,
  uploadTemplateSuccess,
  uploadTemplateFailure,
} from "../../slices/templates/resumeTemplateSlice";
import { uploadResumeTemplateApi } from "../../../api/templates/resumeTemplateApi";

function* handleUploadTemplate(action) {
  try {
    const token = yield select((state) => state.auth.accessToken);
    const formData = new FormData();
    formData.append("resume", action.payload);

    const response = yield call(uploadResumeTemplateApi, formData, token);
    yield put(uploadTemplateSuccess(response));
  } catch (error) {
    yield put(uploadTemplateFailure(error.message));
  }
}

export default function* resumeTemplateSaga() {
  yield takeLatest(uploadTemplateRequest.type, handleUploadTemplate);
}
