import { takeEvery, call, put } from "redux-saga/effects";
import {
  REQUEST_SEARCH_PATIENT,
  retrieveSearchPatient,
} from "../actions/testAction";
import { patientSearchApi } from "../api/patientSearch";

function* patientSearchSaga(action) {
  try {
    const response = yield call(patientSearchApi, action);
    yield put(retrieveSearchPatient(response));
  } catch (e) {
    console.log(e);
  }
}

export default function* patientSearchRootSaga() {
  yield takeEvery(REQUEST_SEARCH_PATIENT, patientSearchSaga);
}
