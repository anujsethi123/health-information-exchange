import { combineReducers } from "redux";
import loginDetails from "./loginReducer";
import patientSearchDetails from "./patientSearchReducer";

const rootReducer = combineReducers({
  loginDetails,
  patientSearchDetails,
});

export default rootReducer;
