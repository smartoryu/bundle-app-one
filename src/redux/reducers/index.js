import { combineReducers } from "redux";
import duration from "./parkingDuration";
import payment from "./parkingPayment";

export default combineReducers({
  duration,
  payment
});
