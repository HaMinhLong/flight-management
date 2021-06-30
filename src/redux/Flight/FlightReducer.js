import * as actions from "./FlightTypes";

const flightReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_FLIGHT:
    case actions.SEARCH_FLIGHT:
    case actions.TOTAL_FLIGHT:
      return action.payload;
    case actions.CREATE_FLIGHT:
      return [...state, action.payload];
    case actions.DELETE_FLIGHT:
      return state.filter((data) => data.id !== action.payload.id);
    case actions.UPDATE_FLIGHT:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload.data : data
      );
    default:
      return state;
  }
};

export default flightReducer;
