import * as actions from "./StatisticalTypes";

const statisticalReducer = (
  state = { departure: {}, destination: {}, type: {}, airport: {} },
  action
) => {
  switch (action.type) {
    case actions.TOTAL_FLIGHT_BY_PLACE_DEPARTURE:
      return { ...state, departure: action.payload };
    case actions.TOTAL_FLIGHT_BY_PLACE_DESTINATION:
      return { ...state, destination: action.payload };
    case actions.TOTAL_FLIGHT_BY_TYPE:
      return { ...state, type: action.payload };
    case actions.TOTAL_FLIGHT_BY_AIRPORT:
      return { ...state, airport: action.payload };
    default:
      return state;
  }
};

export default statisticalReducer;
