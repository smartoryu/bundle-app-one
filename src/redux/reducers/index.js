import { combineReducers } from "redux";
import parkingApp from "./parkingReducers";
import wordCounterApp from "./wordReducers";

export default combineReducers({
  parkingApp,
  wordCounterApp
});
