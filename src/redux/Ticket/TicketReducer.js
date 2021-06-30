import * as actions from "./TicketTypes";

const ticketReducer = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_TICKET:
    case actions.SEARCH_TICKET:
      return action.payload;
    case actions.CREATE_TICKET:
      return [...state, action.payload];
    case actions.DELETE_TICKET:
      return state.filter((data) => data.id !== action.payload.id);
    case actions.UPDATE_TICKET:
      return state.map((data) =>
        data.id === action.payload.id ? action.payload.data : data
      );
    default:
      return state;
  }
};

export default ticketReducer;
