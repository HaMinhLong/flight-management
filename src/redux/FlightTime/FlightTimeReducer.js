import * as actions from "./FlightTimeTypes";

const flightTimeReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_FLIGHT_TIME:
    case actions.SEARCH_FLIGHT_TIME:
      return action.payload;
    case actions.CREATE_FLIGHT_TIME:
      return [...state, action.payload];
    case actions.DELETE_FLIGHT_TIME:
      return state.filter((data) => data.id !== action.payload.id);
    case actions.UPDATE_FLIGHT_TIME:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload.data : data
      );
    default:
      return state;
  }
};

export default flightTimeReducer;
