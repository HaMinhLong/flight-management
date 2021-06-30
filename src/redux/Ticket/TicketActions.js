import * as api from "../../api/index";
import * as actions from "./TicketTypes";

export const fetchAllTicket = () => async (dispatch) => {
  const { data } = await api.fetchAllTicket();
  console.log(data);
  dispatch({
    type: actions.FETCH_ALL_TICKET,
    payload: data,
  });
};

export const createTicket = (ticket) => async (dispatch) => {
  const { data } = await api.createTicket(ticket);
  dispatch({
    type: actions.CREATE_TICKET,
    payload: data,
  });
};

export const deleteTicket = (id) => async (dispatch) => {
  await api.deleteTicket(id);
  dispatch({
    type: actions.DELETE_TICKET,
    payload: {
      id: id,
    },
  });
};

export const updateTicket = (ticket) => async (dispatch) => {
  await api.updateTicket(ticket.id, ticket);
  dispatch({
    type: actions.UPDATE_TICKET,
    payload: {
      id: ticket.id,
      data: ticket,
    },
  });
};

export const searchTicket = (dataSearch) => async (dispatch) => {
  const { data } = await api.searchTicket(dataSearch);
  dispatch({
    type: actions.SEARCH_TICKET,
    payload: data,
  });
};
