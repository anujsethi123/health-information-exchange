import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import patientSearchSaga from "./patientSearchSaga";

export default function* rootSaga() {
  //yield all sagas inside the all([...])
  yield all([loginSaga(), patientSearchSaga()]);
}
