import * as actions from "./BookTicketTypes";

const bookTicketReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_BOOK_TICKET:
    case actions.SEARCH_BOOK_TICKET:
      return action.payload;
    case actions.CREATE_BOOK_TICKET:
      return [...state, action.payload];
    case actions.DELETE_BOOK_TICKET:
      return state.filter((data) => data.id !== action.payload.id);
    case actions.UPDATE_BOOK_TICKET:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload.data : data
      );
    default:
      return state;
  }
};

export default bookTicketReducer;
