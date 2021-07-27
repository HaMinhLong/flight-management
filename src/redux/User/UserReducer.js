import * as actions from "./UserTypes";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_USER:
    case actions.SEARCH_USER:
    case actions.LOGIN_USER:
    case actions.REGISTER_USER:
    case actions.TOTAL_USER:
      return action.payload;
    case actions.CREATE_USER:
      return [...state, action.payload];
    case actions.DELETE_USER:
      return state.filter((data) => data.id !== action.payload.id);
    case actions.UPDATE_USER:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload.data : data
      );
    default:
      return state;
  }
};

export default userReducer;
