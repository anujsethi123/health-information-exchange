import { createAction } from "redux-actions";

export const RETRIEVE_TESTING = "RETRIEVE_TESTING";
export const REQUEST_LOGIN_DETAILS = "REQUEST_LOGIN_DETAILS";

export const RETRIEVE_LOGIN_DETAILS = "RETRIEVE_LOGIN_DETAILS";

export const REQUEST_SEARCH_PATIENT = "REQUEST_SEARCH_PATIENT";

export const RETRIEVE_SEARCH_PATIENT = "RETRIEVE_SEARCH_PATIENT";

export const CLEAR_SEARCH_PATIENT = "CLEAR_SEARCH_PATIENT";

export const CLEAR_LOGGED_IN_USER_DETAILS = "CLEAR_LOGGED_IN_USER_DETAILS";

export const retrieveTesting = createAction(RETRIEVE_TESTING);

export const REQUEST_FILE_UPLOAD = "REQUEST_FILE_UPLOAD";

export const RETRIEVE_FILE_UPLOAD = "RETRIEVE_FILE_UPLOAD";

export const requestLoginDetails = createAction(REQUEST_LOGIN_DETAILS);

export const retrieveLoginDetails = createAction(RETRIEVE_LOGIN_DETAILS);

export const requestFileUpload = createAction(REQUEST_FILE_UPLOAD);

export const retrieveFileUpload = createAction(RETRIEVE_FILE_UPLOAD);

export const requestSearchPatient = createAction(REQUEST_SEARCH_PATIENT);

export const retrieveSearchPatient = createAction(RETRIEVE_SEARCH_PATIENT);

export const clearSearchPatient = createAction(CLEAR_SEARCH_PATIENT);

export const clearLoggedInUserDetails = createAction(
  CLEAR_LOGGED_IN_USER_DETAILS
);
