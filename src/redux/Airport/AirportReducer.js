import * as actions from "./AirportTypes";

const airportReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_AIRPORT:
    case actions.SEARCH_AIRPORT:
      return action.payload;
    case actions.CREATE_AIRPORT:
      return [...state, action.payload];
    case actions.DELETE_AIRPORT:
      return state.filter((data) => data.id !== action.payload.id);
    case actions.UPDATE_AIRPORT:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload.data : data
      );
    default:
      return state;
  }
};

export default airportReducer;
