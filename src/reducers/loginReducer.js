import {
  RETRIEVE_LOGIN_DETAILS,
  CLEAR_LOGGED_IN_USER_DETAILS,
} from "../actions/testAction";
import { RETRIEVE_FILE_UPLOAD } from "../actions/testAction";

const loginDetails = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_LOGIN_DETAILS:
      return (state = { ...state, ...action.payload.data });
    case RETRIEVE_FILE_UPLOAD:
      return (state = { ...state, ...action.payload.data });
    case CLEAR_LOGGED_IN_USER_DETAILS:
      return (state = {});
    default:
      return state;
  }
};

export default loginDetails;
