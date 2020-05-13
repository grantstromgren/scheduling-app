import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import user from "./userReducer";
import shift from "./shiftReducer";

export default combineReducers({
  alert,
  auth,
  user,
  shift
});
