import { combineReducers } from "redux";
import flightReducer from "./Flight/FlightReducer";

const rootReducer = combineReducers({
  flight: flightReducer,
});

export default rootReducer;
