import { combineReducers } from "redux";
import flightReducer from "./Flight/FlightReducer";
import placeReducer from "./Place/PlaceReducer";
import airportReducer from "./Airport/AirportReducer";

const rootReducer = combineReducers({
  flight: flightReducer,
  place: placeReducer,
  airport: airportReducer,
});

export default rootReducer;
