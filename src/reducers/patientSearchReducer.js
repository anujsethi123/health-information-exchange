import {
  RETRIEVE_SEARCH_PATIENT,
  CLEAR_SEARCH_PATIENT,
} from "../actions/testAction";

const patientSearchDetails = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_SEARCH_PATIENT:
      return (state = { ...state, ...action.payload.data });
    case CLEAR_SEARCH_PATIENT:
      return (state = {});
    default:
      return state;
  }
};

export default patientSearchDetails;
