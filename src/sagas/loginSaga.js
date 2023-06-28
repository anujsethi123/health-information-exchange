import { takeEvery, call, put } from "redux-saga/effects";
import {
  REQUEST_LOGIN_DETAILS,
  retrieveLoginDetails,
  retrieveFileUpload,
  REQUEST_FILE_UPLOAD,
  RETRIEVE_FILE_UPLOAD,
} from "../actions/testAction";
import { loginApi, fileUploadApi } from "../api/login";

function* loginSaga(action) {
  try {
    const response = yield call(loginApi, action);
    yield put(retrieveLoginDetails(response));
  } catch (e) {
    console.log(e);
  }
}

function* fileUploadSaga(action) {
  try {
    const response = yield call(fileUploadApi, action);
    yield put(retrieveFileUpload(response));
  } catch (e) {
    console.log(e);
  }
}

export default function* loginRootSaga() {
  yield takeEvery(REQUEST_LOGIN_DETAILS, loginSaga);
  yield takeEvery(REQUEST_FILE_UPLOAD, fileUploadSaga);
}
