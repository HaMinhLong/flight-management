import * as api from "../../api/index";
import * as actions from "./BookTicketTypes";

export const fetchAllBookTicket = () => async (dispatch) => {
  const { data } = await api.fetchAllBookTicket();
  dispatch({
    type: actions.FETCH_ALL_BOOK_TICKET,
    payload: data,
  });
};

export const createBookTicket = (bookTicket) => async (dispatch) => {
  const { data } = await api.createBookTicket(bookTicket);
  dispatch({
    type: actions.CREATE_BOOK_TICKET,
    payload: data,
  });
};

export const deleteBookTicket = (id) => async (dispatch) => {
  await api.deleteBookTicket(id);
  dispatch({
    type: actions.DELETE_BOOK_TICKET,
    payload: {
      id: id,
    },
  });
};

export const updateBookTicket = (bookTicket) => async (dispatch) => {
  await api.updateBookTicket(bookTicket.id, bookTicket);
  dispatch({
    type: actions.UPDATE_BOOK_TICKET,
    payload: {
      id: bookTicket.id,
      data: bookTicket,
    },
  });
};

export const searchBookTicket = (dataSearch) => async (dispatch) => {
  const { data } = await api.searchBookTicket(dataSearch);
  dispatch({
    type: actions.SEARCH_BOOK_TICKET,
    payload: data,
  });
};
