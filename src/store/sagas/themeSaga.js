import { put, takeEvery } from "redux-saga/effects";
import { toggleTheme, setThemeAsync } from "../slices/themeSlice";

function* handleSetThemeAsync(action) {
  // Perform any async operations here (e.g., API calls, localStorage updates)
  console.log("Saga received theme:", action.payload);

  // Dispatch the toggleTheme action or any other state updates
  yield put(toggleTheme());
}

export default function* watchThemeSaga() {
  yield takeEvery(setThemeAsync.type, handleSetThemeAsync);
}
