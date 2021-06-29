import * as actions from "./PlaceTypes";

const placeReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_PLACE:
    case actions.SEARCH_PLACE:
      return action.payload;
    case actions.CREATE_PLACE:
      return [...state, action.payload];
    case actions.DELETE_PLACE:
      return state.filter((data) => data.id !== action.payload.id);
    case actions.UPDATE_PLACE:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload.data : data
      );
    default:
      return state;
  }
};

export default placeReducer;
