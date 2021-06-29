import { combineReducers } from "redux";
import flightReducer from "./Flight/FlightReducer";
import placeReducer from "./Place/PlaceReducer";

const rootReducer = combineReducers({
  flight: flightReducer,
  place: placeReducer,
});

export default rootReducer;
