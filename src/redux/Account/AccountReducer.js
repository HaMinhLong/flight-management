import * as actions from "./AccountTypes";

const accountReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_ACCOUNT:
    case actions.SEARCH_ACCOUNT:
      return action.payload;
    case actions.CREATE_ACCOUNT:
      return [...state, action.payload];
    case actions.DELETE_ACCOUNT:
      return state.filter((data) => data.id !== action.payload.id);
    case actions.UPDATE_ACCOUNT:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload.data : data
      );
    default:
      return state;
  }
};

export default accountReducer;
