import { combineReducers } from "redux";
import flightReducer from "./Flight/FlightReducer";
import placeReducer from "./Place/PlaceReducer";
import airportReducer from "./Airport/AirportReducer";
import flightTimeReducer from "./FlightTime/FlightTimeReducer";
import userReducer from "./User/UserReducer";
import accountReducer from "./Account/AccountReducer";

const rootReducer = combineReducers({
  flight: flightReducer,
  place: placeReducer,
  airport: airportReducer,
  flightTime: flightTimeReducer,
  user: userReducer,
  account: accountReducer,
});

export default rootReducer;
