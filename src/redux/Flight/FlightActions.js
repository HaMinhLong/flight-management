import * as api from "../../api/index";
import * as actions from "./FlightTypes";

export const fetchAllFlight = () => async (dispatch) => {
  const { data } = await api.fetchAllFlight();
  dispatch({
    type: actions.FETCH_ALL_FLIGHT,
    payload: data,
  });
};

export const createFlight = (flight) => async (dispatch) => {
  const { data } = await api.createFlight(flight);
  dispatch({
    type: actions.CREATE_FLIGHT,
    payload: data,
  });
};

export const deleteFlight = (id) => async (dispatch) => {
  await api.deleteFlight(id);
  dispatch({
    type: actions.DELETE_FLIGHT,
    payload: {
      id: id,
    },
  });
};

export const updateFlight = (flight) => async (dispatch) => {
  await api.updateFlight(flight.id, flight);
  dispatch({
    type: actions.UPDATE_FLIGHT,
    payload: {
      id: flight.id,
      data: flight,
    },
  });
};

export const searchFlight = (dataSearch) => async (dispatch) => {
  const { data } = await api.searchFlight(dataSearch);
  dispatch({
    type: actions.SEARCH_FLIGHT,
    payload: data,
  });
};
