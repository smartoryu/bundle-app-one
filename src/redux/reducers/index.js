import { combineReducers } from "redux";
import parkingState from "./parkingReducers";
import wordCounterState from "./wordReducers";

export default combineReducers({
  parkingState,
  wordCounterState
});
