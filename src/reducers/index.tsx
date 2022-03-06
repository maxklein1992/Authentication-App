import authReducer from "./authentication";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: authReducer,
});
export default allReducers;
