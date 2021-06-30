import { combineReducers } from "redux";
import flightReducer from "./Flight/FlightReducer";
import placeReducer from "./Place/PlaceReducer";
import airportReducer from "./Airport/AirportReducer";
import flightTimeReducer from "./FlightTime/FlightTimeReducer";

const rootReducer = combineReducers({
  flight: flightReducer,
  place: placeReducer,
  airport: airportReducer,
  flightTime: flightTimeReducer,
});

export default rootReducer;
